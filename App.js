import React from 'react';
import LogOut from './screens/auth/LogOut'
import SignUpForm from './screens/auth/SignUpForm'
import LogInForm from './screens/auth/LogInForm'
import AuthLoadingScreen from './screens/loading/AuthLoadingScreen';
import { PersistGate } from 'redux-persist/integration/react'
import * as RNLocalize from "react-native-localize";
import {setI18nConfig} from './locales/i18n';

import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {persistor, store} from './data/users/store';
import {Provider} from 'react-redux';


import Example from './screens/Example';
import RoutesList from './screens/app/RoutesList';
import SearchButton from './components/navigation/SearchButton';
import DrawerButton from './components/navigation/DrawerButton';
import getTheme from './theme/components';
import commonColor from './theme/variables/commonColor';
import {Body, Container, Header, Left, Right, StyleProvider, Title} from 'native-base';
import HomeScreen from './screens/app/HomeScreen';
import {t} from './locales/i18n';
import Navigation from './screens/app/Navigation';

const AuthStack = createStackNavigator({
    LogIn: {
        screen: LogInForm,
        navigationOptions: {
            headerTitle: 'Log In',
        },
    },
    SignUp: {
        screen: SignUpForm,
        navigationOptions: {
            headerTitle: 'Create Account',
        },
    }
});


const MainTabs = createMaterialTopTabNavigator({
    Nearby: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'Nearby',
        },
    },
    ForYou: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'For You',
        },
    },
    Saved: {
        screen: RoutesList,
        navigationOptions: {
            tabBarLabel: 'Saved',
        },
    }
});

const MainDrawer = createDrawerNavigator({
    Routes: {
        screen: HomeScreen,
    },
    'Log Out': {
        screen: LogOut,
    },
    Route: {
        screen: Navigation,
    },

});

const AppModalStack = createStackNavigator(
    {
        App: MainDrawer,
    },
    {
        headerMode: 'screen',
        headerBackTitleVisible: false,
        defaultNavigationOptions: ({ navigation }) => ({
            header: <StyleProvider  style={getTheme(commonColor)}>
                        <Header>
                            <Left>
                                <DrawerButton navigation={navigation}/>
                            </Left>
                            <Body>
                                <Title>{t('routes')}</Title>
                            </Body>
                            <Right>
                                <SearchButton/>
                            </Right>
                        </Header>
                    </StyleProvider>
        }),
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator({
        Loading: {
            screen: AuthLoadingScreen,
        },
        Auth: {
            screen: AuthStack,
        },
        App: {
            screen: AppModalStack,
        },
    })
);


class App extends React.Component {
    constructor(props) {
        super(props);
        setI18nConfig();
    }

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };
    render() {
        return (
            <StyleProvider  style={getTheme(commonColor)}>
                <Container>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <AppContainer/>
                        </PersistGate>
                    </Provider>
                </Container>
            </StyleProvider>
        );
    }
}

export default App;

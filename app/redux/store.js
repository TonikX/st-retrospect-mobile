import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import appFlow from './reducers/main';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, appFlow);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

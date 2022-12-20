/**
 * @format
 */
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import configureStore from './src/redux/store';

const store = configureStore()
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
console.reportErrorsAsExceptions = false;
const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

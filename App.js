import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import store from './store';
import Routes from './Routes';
import { name as appName } from './app.json';
import { AppRegistry, Platform } from 'react-native';

import configureStore from './store';

const store = configureStore();

// AppRegistry.registerComponent('ReactNativeApp', () => App);
// if (Platform.OS === 'web') {
//   const rootTag =
//     document.getElementById('root') || document.getElementById('main');
//   AppRegistry.runApplication('ReactNativeApp', { rootTag });
// }
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('#root', () => RNRedux);

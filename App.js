import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Routes';

const rootComponent = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
export default rootComponent;

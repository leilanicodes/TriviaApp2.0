// import React from 'react';
// import { Router, Scene } from 'react-native-router-flux';
// import Home from './Home.js';
// import Questions from './Questions.js';

// const Routes = () => (
//   <Router>
//     <Scene key="root">
//       <Scene key="home" component={Home} title="Home" initial={true} />
//       <Scene key="questions" component={Questions} title="Questions" />
//     </Scene>
//   </Router>
// );
// export default Routes;

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import Questions from './Questions';

const Routes = createStackNavigator(
  {
    Home: { screen: Home },
    Questions: { screen: Questions },
  },
  {
    initialRoutName: 'HomeRT',
  }
);

let Navigation = createAppContainer(Routes);

export default Navigation;

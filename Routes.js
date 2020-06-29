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

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './components/Home';
import Questions from './components/Questions';

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

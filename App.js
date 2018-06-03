import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

import { routesApp, routesAuth } from './src/routes';
import routesConfig from './src/routesConfig';
import SplashScreen from './src/components/SplashScreen';

YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];

const AppStack = createStackNavigator(routesApp, routesConfig.App);
const AuthStack = createStackNavigator(routesAuth, routesConfig.Auth);

export default createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  },
);

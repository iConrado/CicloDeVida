import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { routesApp, routesAuth } from './src/routes';
import routesConfig from './src/routesConfig';
import SplashScreen from './src/components/SplashScreen';

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

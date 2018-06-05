import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

import { routesApp, routesAuth } from './src/routes';
import routesConfig from './src/routesConfig';
import SplashScreen from './src/components/SplashScreen';
import MenuDrawer from './src/components/functions/MenuDrawer';

YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];

const AppStack = createStackNavigator(routesApp, routesConfig.App);
const AuthStack = createStackNavigator(routesAuth, routesConfig.Auth);

const itensDrawer = {
  Simulação: { screen: AppStack },
};

const Drawer = createDrawerNavigator(itensDrawer, { contentComponent: MenuDrawer, ...routesConfig.Drawer });

export default createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: Drawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  },
);

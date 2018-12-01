import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { StatusBar, Platform, YellowBox } from 'react-native';

import { routesApp, routesIntro, routesAuth } from './src/routes';
import routesConfig from './src/routesConfig';
import SplashScreen from './src/components/SplashScreen';
import MenuDrawer from './src/components/functions/MenuDrawer';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('#0A2955');
}
StatusBar.setBarStyle('light-content');

const AppStack = createStackNavigator(routesApp, routesConfig.App);
const IntroStack = createStackNavigator(routesIntro, routesConfig.Intro);
const AuthStack = createStackNavigator(routesAuth, routesConfig.Auth);

const itensDrawer = {
  Introdução: { screen: IntroStack },
  Simulação: { screen: AppStack },
};

const Drawer = createDrawerNavigator(itensDrawer, { contentComponent: MenuDrawer, ...routesConfig.Drawer });

export default createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: Drawer,
    Intro: IntroStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  },
);

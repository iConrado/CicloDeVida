import React from 'react';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import Timer from 'react-native-timer';

import styles from './functions/styles';
import { setupGoogle } from './functions/conectar';

const planoDeFundo = require('../imgs/fundo.jpg');

export default class SplashScreen extends React.Component {
  componentWillMount() {
    this.carregarApp();
  }

  componentWillUnmount() {
    Timer.clearTimeout('splash');
  }

  // Fetch the token from storage then navigate to our appropriate place
  async carregarApp() {
    const { navigate } = this.props.navigation;

    Timer.setTimeout(
      'splash',
      () => {
        setupGoogle();
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            navigate('App');
          } else {
            navigate('Auth');
          }
        });
      },
      2000,
    );
  }

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground source={planoDeFundo} style={{ width: '100%', height: '100%' }}>
        <View style={styles.viewSplash}>
          <Text style={styles.splash}>Consultoria</Text>
          <Text style={styles.splash}>Ciclo de Vida</Text>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      </ImageBackground>
    );
  }
}

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, View, StatusBar } from 'react-native';

import HomeScreen from './src/components/HomeScreen';
import PatrimonioScreen from './src/components/PatrimonioScreen';
import ReservaScreen from './src/components/ReservaScreen';
import AposentadoriaScreen from './src/components/AposentadoriaScreen';
import SegurancaScreen from './src/components/SegurancaScreen';
import ConsumoScreen from './src/components/ConsumoScreen';
import ResultadoScreen from './src/components/ResultadoScreen';

const AppNav = StackNavigator({
  Home: { screen: HomeScreen },
  Patrimonio: { screen: PatrimonioScreen },
  Reserva: { screen: ReservaScreen },
  Aposentadoria: { screen: AposentadoriaScreen },
  Seguranca: { screen: SegurancaScreen },
  Consumo: { screen: ConsumoScreen },
  Resultado: { screen: ResultadoScreen },
  }, {
    initialRouteName: 'Home',
    headerMode: 'float',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Cabecalho from './Functions/Cabecalho';
import BackOptions from './Functions/BackOptions';

export default class ResultadoScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: BackOptions.hTintColor,
    headerStyle: BackOptions.hStyle,
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Resultado</Text>
        <Button 
          title='Recomeçar'
          onPress={() => goBack({ routeName: 'Home' })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

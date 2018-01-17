import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Cabecalho from './Functions/Cabecalho';
import BackOptions from './Functions/BackOptions';

export default class ReservaScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: BackOptions.hTintColor,
    headerStyle: BackOptions.hStyle,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Reserva</Text>
        <Button 
          title='Próximo'
          onPress={() => navigate('Aposentadoria')}
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

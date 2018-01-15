import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Cabecalho from './Function/Cabecalho';

export default class PatrimonioScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>Patrimonio</Text>
        <Button 
          title='Home'
          onPress={() => navigate('Home')}
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
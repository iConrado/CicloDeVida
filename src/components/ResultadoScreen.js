import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Button } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
//import Controle from './functions/Controle';
//import Ciclo from './functions/Ciclo';

//const C = new Ciclo();
//let objErro = {};

export default class ResultadoScreen extends React.Component {
  static navigationOptions = { //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: EstiloVoltar.hTintColor,
    headerStyle: EstiloVoltar.hStyle,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      modalErro: false, 
    };
    //this.fechaErro = this.fechaErro.bind(this);
    //this.abreErro = this.abreErro.bind(this);
  }

  abreErro(e, tipo) {
    //objErro = e;
    this.setState({ modalErro: true });
    switch (tipo) {
      case 0:
        console.log('Retorno 0');
        break;
      default:
        console.log('Retorno default');
    }
  }

  fechaErro() {
    this.setState({ modalErro: false });
    //objErro = {};
  }

  render() {
    return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Text>Resultado</Text>
        
      </ScrollView>
    );
  }
}

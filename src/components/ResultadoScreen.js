import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
//import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';

const C = new Ciclo();
let objErro = {};

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
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
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
      <View style={styles.tela}>
        <ScrollView 
          style={styles.scroll}
          contentContainerStyle={styles.container}
        >
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalErro 
            visivel={this.state.modalErro}
            fechar={this.fechaErro}
            objErro={objErro}
          />
          {/* **************************************************************************** */}
          
          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Consumo e</Text>
            <Text style={styles.titulo}>Amplicação do Patrimônio</Text>
          </View>
          
        </ScrollView>

        <Rodape
        valor={this.state.comprometimento}
        funcProxTela={this.proxTela}
        tela='Resultado'
        />

      </View>
    );
  }
}

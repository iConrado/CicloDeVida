import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Controle from './functions/Controle';

let C = {};
let objErro = {};

export default class PatrimonioScreen extends React.Component {
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
    C = this.props.navigation.state.params.Ciclo;
    console.log(C);
  }

  abreErro(e, tipo) {
    objErro = e;
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
    objErro = {};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
        <ModalErro 
          visivel={this.state.modalErro}
          fechar={this.fechaErro}
          objErro={objErro}
        />
        {/* **************************************************************************** */}


        <Text>Patrimonio</Text>
        <Button 
          title='Próximo'
          onPress={() => navigate('Reserva')}
        />
        <Text>{C.getNome()}</Text>
        <Text />
        <Text />
        <Text />
        <Text />
        <Button 
          title='Erro'
          onPress={() => Controle(this.abreErro, C.teste, 'Arro-doce')}
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
  },
  back: {
    backgroundColor: '#568CD9',
  }
});

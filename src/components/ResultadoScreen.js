import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalMsg from './functions/ModalMsg';
// import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';

const C = new Ciclo();
const objErro = {};

export default class ResultadoScreen extends React.Component {
  static navigationOptions = {
    //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: EstiloVoltar.hTintColor,
    headerStyle: EstiloVoltar.hStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);

    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  montagem() {
    C.salvar();
    this.setState({ carregado: true });
  }

  abreErro() {
    // objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    // objErro = {};
  }

  proxTela() {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    // Validação das regras de negócio, registro e gravação de log
    this.props.navigation.popToTop();
    // navigate(tela);

    return true;
  }

  render() {
    if (!this.state.carregado) {
      return <Carregando />;
    }
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Resultado</Text>
          </View>
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="App" />
      </View>
    );
  }
}

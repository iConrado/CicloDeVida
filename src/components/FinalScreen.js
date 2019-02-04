import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import ModalMsg from './functions/ModalMsg';

const objErro = {};
const replay = require('../imgs/replay.png');

export default class FinalScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

  constructor(props) {
    super(props);
    this.state = {
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
    this.codigo = {};
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
    const { popToTop } = this.props.navigation;
    popToTop();

    return true;
  }

  render() {
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          <View>
            <Text>Aprenda a organizar sua vida financeira e alcance seus objetivos!</Text>
          </View>
        </ScrollView>

        <View style={styles.result_viewRodape}>
          <TouchableOpacity onPress={() => this.proxTela()} style={{ flexDirection: 'row' }}>
            <Image source={replay} style={{ height: 20, width: 20 }} />
            <Text>Refazer a Simulação</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

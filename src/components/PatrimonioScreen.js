import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import ModalMsg from './functions/ModalMsg';
import controle from './functions/controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';

import SliderInvestimentos from './patrimonio/SliderInvestimentos';
import SliderImoveis from './patrimonio/SliderImoveis';
import SliderVeiculos from './patrimonio/SliderVeiculos';

const C = new Ciclo();
let patrForm = 0;
let objErro = {};

export default class PatrimonioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

  static patrimonioEsperado() {
    if (patrForm > 0) {
      return <Text style={styles.txValor}>{monetizar(C.patrimonioEsperado())}</Text>;
    }
    return <Text style={styles.txValor}>{monetizar(0)}</Text>;
  }

  static percentualPatrimonio() {
    let percPatr = 0;
    const patrEsp = C.patrimonioEsperado();

    if (patrEsp === 0) {
      return <Text style={styles.txValorPos}>100%</Text>;
    }

    if (patrForm > 0) {
      percPatr = patrForm / patrEsp;
    }
    if (percPatr >= 1) {
      return <Text style={styles.txValorPos}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>;
    }

    if (percPatr > 0 && percPatr < 1) {
      return <Text style={styles.txValorNeg}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>;
    }

    return <Text style={styles.txValor}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>;
  }

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      invest: 0,
      imoveis: 0,
      veiculos: 0,
      comprometimento: 0,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);

    this.defInvest = this.defInvest.bind(this);
    this.defImoveis = this.defImoveis.bind(this);
    this.defVeiculos = this.defVeiculos.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  async montagem() {
    await this.setState({
      invest: C.getInvest(),
      imoveis: C.getImoveis(),
      veiculos: C.getVeiculos(),
    });
    await this.setState({ carregado: true });
  }

  abreErro(e) {
    objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    objErro = {};
  }

  patrimonioFormado() {
    const { invest, imoveis, veiculos } = this.state;
    patrForm = invest + imoveis + veiculos;

    if (patrForm >= C.patrimonioEsperado()) {
      return <Text style={styles.txValorPos}>{monetizar(patrForm)}</Text>;
    }

    if (patrForm < C.patrimonioEsperado() && patrForm > 0) {
      return <Text style={styles.txValorNeg}>{monetizar(patrForm)}</Text>;
    }

    return <Text style={styles.txValor}>{monetizar(patrForm)}</Text>;
  }

  defInvest(valor) {
    this.setState({ invest: valor });
  }

  defImoveis(valor) {
    this.setState({ imoveis: valor });
  }

  defVeiculos(valor) {
    this.setState({ veiculos: valor });
  }

  async proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.

    const { navigate } = this.props.navigation;

    const { invest, imoveis, veiculos } = this.state;

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setInvest, invest)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setImoveis, imoveis)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setVeiculos, veiculos)) {
      return false;
    }

    navigate(tela);

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
            <Text style={styles.titulo}>Patrimônio</Text>
          </View>

          {/* View Investimento */}
          <SliderInvestimentos inicial={this.state.invest} retorno={this.defInvest} />

          {/* View Imóveis */}
          <SliderImoveis inicial={this.state.imoveis} retorno={this.defImoveis} />

          {/* View Veículos */}
          <SliderVeiculos inicial={this.state.veiculos} retorno={this.defVeiculos} />

          <View style={styles.espacador} />

          {/* View Calculos */}
          <View style={styles.separador} />
          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewCompHoriz}>
                <Text style={styles.label}>Patrimônio formado:</Text>
              </View>
              <View style={styles.viewCompHoriz}>{this.patrimonioFormado()}</View>
            </View>
            <View style={[styles.viewHorizontal, styles.espacador]}>
              <View style={styles.viewCompHoriz}>
                <Text style={styles.label}>Patrimônio esperado:</Text>
              </View>
              <View style={styles.viewCompHoriz}>{PatrimonioScreen.patrimonioEsperado()}</View>
            </View>
            <View style={[styles.viewHorizontal, styles.espacador]}>
              <View style={styles.viewCompHoriz}>
                <Text style={styles.label}>Resultado:</Text>
              </View>
              <View style={styles.viewCompHoriz}>{PatrimonioScreen.percentualPatrimonio()}</View>
            </View>
          </View>

          <View style={styles.espacador} />
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Reserva" />
      </View>
    );
  }
}

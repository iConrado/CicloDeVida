import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import LimiteDeErro from './functions/LimiteDeErro';
import controle from './functions/controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';

import SliderGasto from './reserva/SliderGasto';
import SliderReserva from './reserva/SliderReserva';

const C = new Ciclo();
let objErro = {};
const tmpComprometimento = [];

export default class ReservaScreen extends React.Component {
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
      modalErro: false,
      gasto: 0,
      reserva: C.getReserva() === 0 ? Number.parseInt(C.getSalLiq() * 0.1, 10) : C.getReserva(),
      comprometimento: 0,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);

    this.defGasto = this.defGasto.bind(this);
    this.defReserva = this.defReserva.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  montagem() {
    tmpComprometimento[0] = this.state.gasto;
    tmpComprometimento[1] = this.state.reserva;
    this.comprometimentoAtual();
    this.setState({ carregado: true });
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

  percentualRenda(valor) {
    if (valor === 0) {
      return 0;
    }

    const salario = C.getSalLiq();
    const perc = valor / salario * 100;

    return perc.toFixed(1).replace('.', ',');
  }

  comprometimento() {
    const gasto = this.state.gasto;
    if (gasto > 0) {
      const compr = C.comprometimentoGasto(gasto) * 100;
      return compr.toFixed(1).replace('.', ',');
    }
    return 0.0;
  }

  poupanca() {
    const salario = C.getSalLiq();

    if (salario > 0) {
      // Inserir este código na regra de negócio
      return monetizar(salario * 12);
    }
    return monetizar(0);
  }

  calculoNecessario() {
    const calc = C.getInvest() - desmonetizar(this.poupanca());

    return calc;
  }

  tempoNecessario() {
    const necessario = this.calculoNecessario();
    const reserva = this.state.reserva;
    if (necessario < 0) {
      const abs = Math.abs(necessario);
      const meses = Math.ceil(abs / reserva);
      if (Number.isFinite(meses)) {
        return meses;
      }
    }
    return 0;
  }

  montaResultadoCalculo() {
    const calc = this.calculoNecessario();
    if (calc === 0) {
      return <Text style={styles.reserva_txDireita}>{monetizar(calc)}</Text>;
    }

    if (calc > 0) {
      return <Text style={styles.reserva_txPositivo}>{monetizar(calc)}</Text>;
    }

    return <Text style={styles.reserva_txNegativo}>{monetizar(calc)}</Text>;
  }

  defGasto(valor) {
    this.setState({ gasto: valor });
    tmpComprometimento[0] = valor;
    this.comprometimentoAtual();
  }

  defReserva(valor) {
    this.setState({ reserva: valor });
    tmpComprometimento[1] = valor;
    this.comprometimentoAtual();
  }

  comprometimentoAtual() {
    if (tmpComprometimento[0] !== undefined) {
      const valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
      const compr = C.comprometimentoAtual('Reserva', valor);
      this.setState({ comprometimento: compr });
    }
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const gasto = this.state.gasto;
    const reserva = this.state.reserva;

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setGasto, gasto)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setReserva, reserva)) {
      return false;
    }

    navigate(tela);
  }

  render() {
    if (!this.state.carregado) {
      return <Carregando />;
    }
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalErro visivel={this.state.modalErro} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}
          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Reserva de Emergência</Text>
          </View>

          <LimiteDeErro>
            <SliderGasto inicial={this.state.gasto} retorno={this.defGasto} />
          </LimiteDeErro>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <Text style={[styles.label, styles.reserva_lbGasto]}>Comprometimento da renda com gastos mensais:</Text>
              <View style={styles.reserva_viewCentral}>
                <Text style={styles.reserva_txDireita}>{this.comprometimento()}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <Text style={[styles.label, styles.reserva_lbGasto]}>Poupança (12x renda):</Text>
              <View style={styles.reserva_viewCentral}>
                <Text style={styles.reserva_txDireita}>{this.poupanca()}</Text>
              </View>
            </View>
          </View>

          <LimiteDeErro>
            <SliderReserva inicial={this.state.reserva} retorno={this.defReserva} />
          </LimiteDeErro>

          <View style={styles.espacador} />
          <View style={styles.separador} />
          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.reserva_viewCalculo}>
                <Text style={[styles.label, styles.reserva_lbCalculo]}>Investimento</Text>
                <Text style={[styles.label, styles.reserva_lbCalculo]}>-</Text>
                <Text style={[styles.label, styles.reserva_lbCalculo]}>Poupança emergencial</Text>
              </View>
              <View style={styles.reserva_viewCentral}>{this.montaResultadoCalculo()}</View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.espacador} />
            <View style={styles.viewHorizontal}>
              <View style={styles.reserva_viewCalculo}>
                <Text style={[styles.label, styles.reserva_lbCalculo]}>Tempo para reserva:</Text>
              </View>
              <View style={styles.reserva_viewCentral}>
                <Text style={styles.reserva_txDireita}>{this.tempoNecessario()} meses</Text>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Aposentadoria" />
      </View>
    );
  }
}

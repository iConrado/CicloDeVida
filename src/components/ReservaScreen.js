import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity } from 'react-native';
import Slider from 'react-native-slider';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';

const C = new Ciclo();
let objErro = {};

export default class ReservaScreen extends React.Component {
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
      gasto: 0,
      reserva: C.getReserva() === 0 ? Number.parseInt(C.getSalLiq() * 0.1, 10) : C.getReserva(),
      tmpGasto: 0,
      tmpReserva: C.getReserva() === 0 ? Number.parseInt(C.getSalLiq() * 0.1, 10) : C.getReserva(),
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
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
    if (valor === 0) { return 0; }
    
    const salario = C.getSalLiq();
    const perc = (valor / salario) * 100;

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
    const gasto = this.state.gasto;

    if (gasto > 0) {
      // Inserir este código na regra de negócio
      return monetizar(gasto * 12);
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
      return (
        <Text style={styles.reserva_txDireita}>{monetizar(calc)}</Text>
      );
    }

    if (calc > 0) {
      return (
        <Text style={styles.reserva_txPositivo}>{monetizar(calc)}</Text>
      );
    }

    return (
      <Text style={styles.reserva_txNegativo}>{monetizar(calc)}</Text>
    );
  }

  proxTela(tela) {
    const { navigate } = this.props.navigation;
    navigate(tela);
  }

  render() {
    return (
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
          <Text style={styles.titulo}>Reserva de Emergência</Text>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.label}>Informe seu gasto mensal: </Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Slider
              style={styles.reserva_slider}
              minimumValue={0}
              maximumValue={C.getSalLiq()}
              step={100}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpGasto}
              onValueChange={(value) => this.setState({ tmpGasto: value })}
              onSlidingComplete={(value) => this.setState({ gasto: value })}
            />
            <View style={styles.reserva_viewCentral}>
              <Text style={styles.reserva_txDireita}>{monetizar(this.state.tmpGasto)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              Comprometimento da renda com gastos mensais: 
            </Text>
            <View style={styles.reserva_viewCentral}>
              <Text style={styles.reserva_txDireita}>{this.comprometimento()}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>Poupança (12x gastos):</Text>
            <View style={styles.reserva_viewCentral}>
              <Text style={styles.reserva_txDireita}>{this.poupanca()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.label}>Faça sua reserva (sugestão 10%): </Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Slider
              style={styles.reserva_slider}
              minimumValue={0}
              maximumValue={Number.parseInt(C.getSalLiq() * 0.3, 10)}
              step={50}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpReserva}
              onValueChange={(value) => this.setState({ tmpReserva: value })}
              onSlidingComplete={(value) => this.setState({ reserva: value })}
            />
            <View style={styles.reserva_viewCentral}>
              <Text style={styles.reserva_txDireita}>
                {this.percentualRenda(this.state.tmpReserva)}%
              </Text>
              <Text style={styles.reserva_txDireita}>{monetizar(this.state.tmpReserva)}</Text>
            </View>
          </View>
        </View>
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
            <View style={styles.reserva_viewCentral}>
              {this.montaResultadoCalculo()}
            </View>
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
        <View style={styles.viewBotoes}>
          <TouchableOpacity 
            style={styles.botao}
            onPress={() => this.proxTela('Aposentadoria')}
          >
            <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

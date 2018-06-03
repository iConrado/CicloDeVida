import React from 'react';
import { Image, ScrollView, View, Text, TextInput } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalMsg from './functions/ModalMsg';
import LimiteDeErro from './functions/LimiteDeErro';
import controle from './functions/controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';

import SliderTaxa from './aposentadoria/SliderTaxa';
import SliderIdade from './aposentadoria/SliderIdade';
import SliderDisponib from './aposentadoria/SliderDisponib';

const star = require('../imgs/ic_stars_white.png');

const C = new Ciclo();
let objErro = {};
const tmpComprometimento = [];

export default class AposentadoriaScreen extends React.Component {
  static navigationOptions = {
    //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: EstiloVoltar.hTintColor,
    headerStyle: EstiloVoltar.hStyle,
  };

  static faixaEtaria() {
    const faixaEtaria = C.faixaEtaria();

    return faixaEtaria;
  }

  static sugestaoReserva() {
    const sugestaoReserva = C.sugestReserv();

    return sugestaoReserva;
  }

  static percentualRenda(valor) {
    if (valor === 0) {
      return 0;
    }

    const salario = C.getSalLiq();
    const perc = (valor / salario) * 100;

    return perc.toFixed(1).replace('.', ',');
  }

  static rendaPercentual() {
    const perc = AposentadoriaScreen.sugestaoReserva();

    if (perc === 0) {
      return 0;
    }

    const salario = C.getSalLiq();
    const valor = perc * salario;

    return parseInt(valor, 10);
  }

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      disponib: 0,
      reservaPrev: 0,
      idadeAposent: 50,
      rentab: 0,
      comprometimento: 0,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);

    this.defRentab = this.defRentab.bind(this);
    this.defIdadeAposent = this.defIdadeAposent.bind(this);
    this.defDisponib = this.defDisponib.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  async montagem() {
    tmpComprometimento[0] = this.state.disponib;
    await this.comprometimentoAtual();
    await this.setState({
      disponib: C.getDisponib() || Math.ceil(AposentadoriaScreen.rendaPercentual() / 50) * 50,
      reservaPrev: C.getReservaPrev(),
      idadeAposent: C.getIdadeAposent() || 50,
      rentab: C.getRentab(),
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

  reservaTotal() {
    const { disponib, reservaPrev, rentab, idadeAposent } = this.state;
    const rentabMM = Ciclo.taxaMensal(rentab);
    const idadeAtual = C.idadeAtual();
    const prazoAA = idadeAposent - idadeAtual;
    const prazoMM = prazoAA * 12;

    const reservaTotal = Ciclo.montante(reservaPrev, disponib, prazoMM, rentabMM);

    return parseInt(reservaTotal, 10);
  }

  defDisponib(valor) {
    this.setState({ disponib: valor });
    tmpComprometimento[0] = valor;
    this.comprometimentoAtual();
  }

  defIdadeAposent(valor) {
    this.setState({ idadeAposent: valor });
  }

  defRentab(valor) {
    this.setState({ rentab: valor });
  }

  async comprometimentoAtual() {
    if (tmpComprometimento[0] !== undefined) {
      const valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
      const compr = C.comprometimentoAtual('Aposentadoria', valor);
      await this.setState({ comprometimento: compr });
    }
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const { disponib, reservaPrev, idadeAposent, rentab } = this.state;

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setDisponib, disponib)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setReservaPrev, reservaPrev)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setIdadeAposent, idadeAposent)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setRentab, rentab)) {
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
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Aposentadoria</Text>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewLogo}>
                <Image style={styles.imgLogo} source={star} />
              </View>
              <View style={styles.viewPosLogo}>
                <Text style={styles.aposent_vinheta}>Nossa sugestão para começar agora!</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.aposent_viewCalculo}>
                <Text style={[styles.label, styles.aposent_lbCalculo]}>Sua faixa estária:</Text>
                <Text style={[styles.label, styles.aposent_lbCalculo]}>{AposentadoriaScreen.faixaEtaria()}</Text>
              </View>
              <View style={styles.aposent_viewCentral}>
                <Text style={styles.aposent_txDireita}>
                  {`${monetizar(AposentadoriaScreen.rendaPercentual())} (${AposentadoriaScreen.sugestaoReserva() * 100}%)`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.separador} />

          <View style={styles.viewCentral}>
            <Text style={styles.aposent_vinheta}>Faça seu cálculo</Text>
          </View>

          <LimiteDeErro>
            <SliderDisponib inicial={this.state.disponib} retorno={this.defDisponib} />
          </LimiteDeErro>

          <View style={styles.viewVertical}>
            <Text style={styles.label}>Reserva existente em plano previdenciário privado:</Text>
            <TextInput
              style={styles.aposent_input}
              keyboardType="numeric"
              maxLength={10}
              autoCorrect={false}
              selectTextOnFocus
              underlineColorAndroid="#EAEAEA"
              onChangeText={text => this.setState({ reservaPrev: desmonetizar(text) })}
              value={monetizar(this.state.reservaPrev)}
            />
          </View>

          <View style={styles.viewCentral}>
            <Text style={styles.aposent_vinheta}>Simulação</Text>
          </View>

          <SliderIdade inicial={this.state.idadeAposent} retorno={this.defIdadeAposent} />

          <SliderTaxa inicial={this.state.rentab} retorno={this.defRentab} />

          <View style={styles.separador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.aposent_viewReserva}>
                <Text style={[styles.label, styles.aposent_lbReserva]}>Reserva total:</Text>
              </View>
              <View style={styles.aposent_viewReserva}>
                <Text style={styles.aposent_txResTotal}>{monetizar(this.reservaTotal())}</Text>
              </View>
            </View>
          </View>

          <View style={styles.separador} />
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Seguranca" />
      </View>
    );
  }
}

import React from 'react';
import { 
  Image,
  ScrollView, 
  View, 
  Text, 
  TextInput, } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import LimiteDeErro from './functions/LimiteDeErro';
import Controle from './functions/Controle';
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
      disponib: Math.ceil(this.rendaPercentual() / 50) * 50,
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

  componentWillMount() {
    tmpComprometimento[0] = this.state.disponib;
    this.comprometimentoAtual();
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

  faixaEtaria() {
    const faixaEtaria = C.faixaEtaria();

    return faixaEtaria;    
  }

  sugestaoReserva() {
    const sugestaoReserva = C.sugestReserv();

    return sugestaoReserva;
  }

  percentualRenda(valor) {
    if (valor === 0) { return 0; }
    
    const salario = C.getSalLiq();
    const perc = (valor / salario) * 100;

    return perc.toFixed(1).replace('.', ',');
  }

  rendaPercentual() {
    const perc = this.sugestaoReserva();

    if (perc === 0) { return 0; }

    const salario = C.getSalLiq();
    const valor = (perc * salario);

    return parseInt(valor, 10);    
  }

  reservaTotal() {
    const disponib = this.state.disponib;
    const reservaPrev = this.state.reservaPrev;
    const rentab = this.state.rentab;
    const rentabMM = C.taxaMensal(rentab);
    const idadeAtual = C.idadeAtual();
    const idadeAposent = this.state.idadeAposent;
    const prazoAA = idadeAposent - idadeAtual;
    const prazoMM = prazoAA * 12;

    const reservaTotal = C.montante(reservaPrev, disponib, prazoMM, rentabMM);

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

  comprometimentoAtual() {
    if (tmpComprometimento[0] !== undefined) {
      const valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
      const compr = C.comprometimentoAtual('Aposentadoria', valor);
      this.setState({ comprometimento: compr });
    }
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const disponib = this.state.disponib;
    const reservaPrev = this.state.reservaPrev;
    const idadeAposent = this.state.idadeAposent;
    const rentab = this.state.rentab;

    // Validação das regras de negócio, registro e gravação de log
    if (!Controle(this.abreErro, C, C.setDisponib, disponib)) { return false; }
    if (!Controle(this.abreErro, C, C.setReservaPrev, reservaPrev)) { return false; }
    if (!Controle(this.abreErro, C, C.setIdadeAposent, idadeAposent)) { return false; }
    if (!Controle(this.abreErro, C, C.setRentab, rentab)) { return false; }

    navigate(tela);
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
            <Text style={styles.titulo}>Aposentadoria</Text>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewLogo}>
                <Image 
                  style={styles.imgLogo}
                  source={star}
                />
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
                <Text style={[styles.label, styles.aposent_lbCalculo]}>{this.faixaEtaria()}</Text>
              </View>
              <View style={styles.aposent_viewCentral}>
                <Text style={styles.aposent_txDireita}>
                  {`${monetizar(this.rendaPercentual())} (${this.sugestaoReserva() * 100}%)`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.separador} />
          
          <View style={styles.viewCentral}>
            <Text style={styles.aposent_vinheta}>Faça seu cálculo</Text>
          </View>

          <LimiteDeErro>
            <SliderDisponib 
              inicial={this.state.disponib}
              retorno={this.defDisponib} 
            />
          </LimiteDeErro>

          <View style={styles.viewVertical}>
            <Text style={styles.label}>Reserva existente em plano previdenciário privado:</Text>
              <TextInput
                ref='reservaPrev'
                style={styles.aposent_input}
                keyboardType='numeric'
                maxLength={10}
                autoCorrect={false}
                selectTextOnFocus
                underlineColorAndroid='#EAEAEA'
                onChangeText={(text) => this.setState({ reservaPrev: desmonetizar(text) })}
                value={monetizar(this.state.reservaPrev)}
              />
          </View>

          <View style={styles.viewCentral}>
            <Text style={styles.aposent_vinheta}>Simulação</Text>
          </View>

          <SliderIdade 
            inicial={this.state.idadeAposent}
            retorno={this.defIdadeAposent} 
          />

          <SliderTaxa 
            inicial={this.state.rentab}
            retorno={this.defRentab} 
          />
          
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

        <Rodape
          valor={this.state.comprometimento}
          funcProxTela={this.proxTela}
          tela='Seguranca'
        />
        
      </View>
    );
  }
}

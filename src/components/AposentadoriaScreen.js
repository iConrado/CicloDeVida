import React from 'react';
import { 
  Image,
  ScrollView, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity } from 'react-native';
import Slider from 'react-native-slider';
//import moment from 'moment';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
//import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';

const star = require('../imgs/ic_stars_white.png');

const C = new Ciclo();
let objErro = {};

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
      Disponib: Math.ceil(this.rendaPercentual() / 50) * 50,
      ReservaPrev: 0,
      IdadeAposent: 50,
      Rentab: 0,
      tmpDisponib: Math.ceil(this.rendaPercentual() / 50) * 50,
      tmpIdadeAposent: 50,
      tmpRentab: 0,
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

  faixaEtaria() {
    const faixaEtaria = C.faixaEtaria();

    return faixaEtaria;    
  }

  sugestaoReserva() {
    const sugestaoReserva = C.getSugestReserv();

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

  taxaMensal(taxaAnual) {
    const taxaMensal = ((1 + taxaAnual) / 12) - 1;
    if (taxaAnual > 0) {
      return taxaMensal;
    } 
    return 0;
  }

  reservaTotal() {
    const Disponib = this.state.Disponib;
    const ReservaPrev = this.state.ReservaPrev;
    const Rentab = this.state.Rentab.toFixed(1);
    const RentabMM = this.taxaMensal(Rentab);
    const IdadeAtual = C.idadeAtual();
    const IdadeAposent = this.state.IdadeAposent;
    const PrazoAA = IdadeAposent - IdadeAtual;
    const PrazoMM = PrazoAA * 12;
    let MontReserva = Disponib;
    let MontReservaPrev = ReservaPrev;


    //Cálculo de juros da disponibilidade de reserva
    for (let i = 1; i <= PrazoMM; i++) {
      MontReserva *= (1 + (RentabMM / 100));
      MontReserva += Disponib;
    }

    //Cálculo de juros da previdência já existente
    for (let i = 1; i <= PrazoAA; i++) {
      MontReservaPrev *= (1 + (Rentab / 100));
    }

    const ReservaTotal = MontReservaPrev + MontReserva;

    return parseInt(ReservaTotal, 10);
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

        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.label}>Sua disponibilidade mensal: </Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Slider
              style={styles.aposent_slider}
              minimumValue={0}
              maximumValue={Number.parseInt(C.getSalLiq() * 0.3, 10)}
              step={50}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpDisponib}
              onValueChange={(value) => this.setState({ tmpDisponib: value })}
              onSlidingComplete={(value) => this.setState({ Disponib: value })}
            />
            <View style={styles.aposent_viewCentral}>
              <Text style={styles.aposent_txDireita}>
                {this.percentualRenda(this.state.tmpDisponib)}%
              </Text>
              <Text style={styles.aposent_txDireita}>{monetizar(this.state.tmpDisponib)}</Text>
             </View>
          </View>
        </View>

        <View style={styles.viewVertical}>
          <Text style={styles.label}>Reserva existente em plano previdenciário privado:</Text>
            <TextInput
              ref='reservaPrev'
              style={styles.aposent_Input}
              keyboardType='numeric'
              maxLength={10}
              autoCorrect={false}
              underlineColorAndroid='#EAEAEA'
              onChangeText={(text) => this.setState({ ReservaPrev: desmonetizar(text) })}
              value={monetizar(this.state.ReservaPrev)}
            />
        </View>

        <View style={styles.espacador} />
        
        <View style={styles.viewVertical}>
          <Text style={styles.label}>Simulação</Text>
        </View>

        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.label}>Idade desejada para aposentadoria (em anos):</Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Slider
              style={styles.aposent_slider}
              minimumValue={C.idadeAtual()}
              maximumValue={80}
              step={1}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpIdadeAposent}
              onValueChange={(value) => this.setState({ tmpIdadeAposent: value })}
              onSlidingComplete={(value) => this.setState({ IdadeAposent: value })}
            />
            <View style={styles.aposent_viewCentral}>
              <Text style={styles.aposent_txDireita}>{this.state.tmpIdadeAposent}</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.label}>Taxa de rentabilidade estimada (a.a.):</Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Slider
              style={styles.aposent_slider}
              minimumValue={0}
              maximumValue={20}
              step={0.1}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpRentab}
              onValueChange={(value) => this.setState({ tmpRentab: value })}
              onSlidingComplete={(value) => this.setState({ Rentab: value })}
            />
            <View style={styles.aposent_viewCentral}>
              <Text style={styles.aposent_txDireita}>{this.state.tmpRentab.toFixed(1)}%</Text>
            </View>
          </View>
        </View>

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

        <View style={styles.viewBotoes}>
          <TouchableOpacity 
            style={styles.botao}
            onPress={() => this.proxTela('Seguranca')}
          >
            <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

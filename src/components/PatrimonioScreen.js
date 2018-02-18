import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image,
  TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';

const imgMoney = require('../imgs/ic_money_white.png');
const imgHome = require('../imgs/ic_home_white.png');
const imgCar = require('../imgs/ic_car_white.png');

const C = new Ciclo();
let patrForm = 0;
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
      invest: 0,
      imoveis: 0,
      veiculos: 0,
      tmpInvest: 0,
      tmpImoveis: 0,
      tmpVeiculos: 0, 
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
  }

  componentWillMount() {

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

  patrimonioFormado() {
    const invest = this.state.invest;
    const imoveis = this.state.imoveis;
    const veiculos = this.state.veiculos;
    patrForm = invest + imoveis + veiculos;
    
    if (patrForm >= C.patrimonioEsperado()) {
      return (<Text style={styles.txValorPos}>{monetizar(patrForm)}</Text>);
    }

    if (patrForm < C.patrimonioEsperado() && patrForm > 0) {
      return (<Text style={styles.txValorNeg}>{monetizar(patrForm)}</Text>);
    }

    return (<Text style={styles.txValor}>{monetizar(patrForm)}</Text>);
  }

  patrimonioEsperado() {
    if (patrForm > 0) {
      return (<Text style={styles.txValor}>{monetizar(C.patrimonioEsperado())}</Text>);  
    }
    return (<Text style={styles.txValor}>{monetizar(0)}</Text>);
  }

  percentualPatrimonio() {
    let percPatr = 0;

    if (patrForm > 0) {
      percPatr = patrForm / C.patrimonioEsperado();
    }
    if (percPatr >= 1) {
      return (
        <Text style={styles.txValorPos}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>
      );
    }

    if (percPatr > 0 && percPatr < 1) {
      return (
        <Text style={styles.txValorNeg}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>
      );
    }

    return (<Text style={styles.txValor}>{(percPatr * 100).toFixed(1).replace('.', ',')}%</Text>);
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.

    const { navigate } = this.props.navigation;

    const invest = this.state.invest;
    const imoveis = this.state.imoveis;
    const veiculos = this.state.veiculos;

    // Validação das regras de negócio, registro e gravação de log
    if (!Controle(this.abreErro, C, C.setInvest, invest)) { return false; }
    if (!Controle(this.abreErro, C, C.setImoveis, imoveis)) { return false; }
    if (!Controle(this.abreErro, C, C.setVeiculos, veiculos)) { return false; }

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
          <Text style={styles.titulo}>Patrimônio</Text>
        </View>
        {/*View Sliders*/}
        <View>
          {/*View Investimento*/}
          <View style={styles.viewVertical}>
            <Text style={styles.label}>Investimentos (aplicações, poupança, etc):</Text>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgMoney}
                />
              </View>
              <View style={styles.viewPosIcone}>
                <Slider
                  style={styles.patrim_slIcone}
                  minimumValue={0}
                  maximumValue={2000000}
                  step={5000}
                  minimumTrackTintColor='#14567A'
                  thumbTintColor='#14567A'
                  value={this.state.tmpInvest}
                  onValueChange={(value) => this.setState({ tmpInvest: value })}
                  onSlidingComplete={(value) => this.setState({ invest: value })}
                />
                <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpInvest)}</Text>
              </View>
            </View>
          </View>
          {/*View Imóveis*/}
          <View style={[styles.viewVertical, styles.espacador]}>
            <Text style={styles.label}>Imóveis (valor total - financiados ou não):</Text>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgHome}
                />
              </View>
              <View style={styles.viewPosIcone}>
                <Slider
                  style={styles.patrim_slIcone}
                  minimumValue={0}
                  maximumValue={5000000}
                  step={10000}
                  minimumTrackTintColor='#14567A'
                  thumbTintColor='#14567A'
                  value={this.state.tmpImoveis}
                  onValueChange={(value) => this.setState({ tmpImoveis: value })}
                  onSlidingComplete={(value) => this.setState({ imoveis: value })}
                />
                <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpImoveis)}</Text>
              </View>
            </View>
          </View>
        {/*View Veículos*/}
          <View style={[styles.viewVertical, styles.espacador]}>
            <Text style={styles.label}>Veículos (valor total - financiados ou não):</Text>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgCar}
                />
              </View>
              <View style={styles.viewPosIcone}>
                <Slider
                  style={styles.patrim_slIcone}
                  minimumValue={0}
                  maximumValue={500000}
                  step={2000}
                  minimumTrackTintColor='#14567A'
                  thumbTintColor='#14567A'
                  value={this.state.tmpVeiculos}
                  onValueChange={(value) => this.setState({ tmpVeiculos: value })}
                  onSlidingComplete={(value) => this.setState({ veiculos: value })}
                />
                <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpVeiculos)}</Text>
              </View>
            </View>
          </View>
        </View>
        {/*Fim da View Sliders*/}
        {/*View Calculos*/}
        <View style={styles.espacador} />
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Patrimônio formado:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              {this.patrimonioFormado()}
            </View>
          </View>
          <View style={[styles.viewHorizontal, styles.espacador]}>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Patrimônio esperado:</Text>
            </View> 
            <View style={styles.viewCompHoriz}>
              {this.patrimonioEsperado()}
            </View>
          </View>
          <View style={[styles.viewHorizontal, styles.espacador]}>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Resultado:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              {this.percentualPatrimonio()}
            </View>
          </View>
        </View>
        <View style={styles.viewBotoes}>
          <TouchableOpacity 
            style={styles.botao}
            onPress={() => this.proxTela('Reserva')}
          >
            <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

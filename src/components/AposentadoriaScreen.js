import React from 'react';
import { 
  Image,
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
              <Text style={[styles.label, styles.aposent_lbCalculo]}>Acima de 40 anos</Text>
            </View>
            <Text style={styles.aposent_txDireita}>R$ 2.650 (12%)</Text>
          </View>
        </View>
        <View style={styles.separador} />
        <View style={styles.viewCentral}>
          <Text style={styles.aposent_vinheta}>Faça seu cálculo</Text>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              View disponibilidade mensal/percentual de renda
            </Text>
            <Text style={styles.reserva_txDireita}>XX</Text>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              View Reserva existente
            </Text>
            <Text style={styles.reserva_txDireita}>XX</Text>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              View Simulação idade
            </Text>
            <Text style={styles.reserva_txDireita}>XX</Text>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              View taxa de rentabilidade
            </Text>
            <Text style={styles.reserva_txDireita}>XX</Text>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <Text style={[styles.label, styles.reserva_lbGasto]}>
              View disponibilidade mensal/percentual de renda
            </Text>
            <Text style={styles.reserva_txDireita}>XX</Text>
          </View>
        </View>
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

import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';

const imgImoveis = require('../imgs/ic_home_white.png');
const imgAuto = require('../imgs/ic_car_white.png');

const C = new Ciclo();
let objErro = {};
const tmpComprometimento = [];

export default class ConsumoScreen extends React.Component {
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
      comprometimento: 0,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);
  }

  componentWillMount() {
    tmpComprometimento[0] = C.getSalLiq() * 0.1;
    tmpComprometimento[1] = C.getSalLiq() * 0.1;
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

  planoImovel() {
    const plano = C.planoImovel();

    return plano;
  }

  planoAuto() {
    const plano = C.planoAuto();

    return plano;
  }

  imovelInvest() {
    const invest = C.imovelInvest();

    return invest;
  }

  autoInvest() {
    const invest = C.autoInvest();

    return invest;
  }

  comprometimentoAtual() {
    let valor = 0;
    if (tmpComprometimento[0] !== undefined) {
      valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
    }
    const compr = C.comprometimentoAtual('Consumo', valor);
    this.setState({ comprometimento: compr });
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

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
            <Text style={styles.titulo}>Consumo e</Text>
            <Text style={styles.titulo}>Amplicação do Patrimônio</Text>
          </View>

          <View style={styles.espacador} />
          <View style={styles.espacador} />
          
          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgImoveis}
                />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <View style={styles.consumo_viewLabel}>
                    <Text style={styles.label}>Imóvel para investimento:</Text>
                    <Text style={styles.label}>Plano de 15 anos (10% da renda):</Text>
                  </View>
                  <View style={styles.consumo_viewValor}>
                    <Text style={styles.consumo_txValor}>{monetizar(this.imovelInvest())}</Text>
                    <Text style={styles.consumo_txValor}>{monetizar(this.planoImovel())}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />
          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgAuto}
                />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <View style={styles.consumo_viewLabel}>
                    <Text style={styles.label}>Carro novo ou troca:</Text>
                    <Text style={styles.label}>Plano de 7 anos (10% da renda):</Text>
                  </View>
                  <View style={styles.consumo_viewValor}>
                    <Text style={styles.consumo_txValor}>{monetizar(this.autoInvest())}</Text>
                    <Text style={styles.consumo_txValor}>{monetizar(this.planoAuto())}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />
          <View style={styles.espacador} />
          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <Text style={styles.label}>Gastos totais:</Text>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>
                Valor mensal:
              </Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>
                {monetizar(this.planoImovel() + this.planoAuto())}
              </Text>
            </View>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>
                Patrimônio a ser gerado:
              </Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>
                {monetizar(this.imovelInvest() + this.autoInvest())}
              </Text>
            </View>
          </View>

          <View style={styles.espacador} />

        </ScrollView>

        <Rodape
          valor={this.state.comprometimento}
          funcProxTela={this.proxTela}
          tela='Resultado'
        />
        
      </View>
    );
  }
}

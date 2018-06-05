import React from 'react';
import { ScrollView, View, Text, TextInput, Image } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalMsg from './functions/ModalMsg';
import controle from './functions/controle';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';

const imgConvenio = require('../imgs/ic_vallet_white.png');
const imgVida = require('../imgs/ic_people_white.png');
const imgImoveis = require('../imgs/ic_home_white.png');
const imgAuto = require('../imgs/ic_car_white.png');

const C = new Ciclo();
let objErro = {};
const tmpComprometimento = [];

export default class SegurancaScreen extends React.Component {
  static navigationOptions = {
    //eslint-disable-line
    headerTitle: Cabecalho('Consultoria Ciclo de Vida'),
    headerBackTitle: 'Voltar',
    headerTintColor: EstiloVoltar.hTintColor,
    headerStyle: EstiloVoltar.hStyle,
  };

  static sugestLim() {
    return C.sugestaoLimSeg();
  }

  static calculaVida() {
    return C.seguroVida();
  }

  static calculaImoveis() {
    return C.seguroImoveis();
  }

  static calculaAuto() {
    return C.seguroAuto();
  }

  static comprometimento(valor) {
    const compr = C.comprometimentoGasto(valor);

    return compr;
  }

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      saude: 0,
      comprometimento: 0,
    };

    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  async montagem() {
    await this.setState({
      saude: C.getSaude(),
    });
    tmpComprometimento[0] = this.state.saude;
    await this.comprometimentoAtual();
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

  calculaComprTotal() {
    const convenio = this.state.saude;
    const vida = SegurancaScreen.calculaVida();
    const imoveis = SegurancaScreen.calculaImoveis();
    const auto = SegurancaScreen.calculaAuto();
    const soma = convenio + vida + imoveis + auto;
    const compr = C.comprometimentoGasto(soma);

    return parseFloat(compr * 100, 10)
      .toFixed(1)
      .replace('.', ',');
  }

  calculaPatrimProt() {
    const conv = this.state.saude;
    return C.patrimonioProt(conv);
  }

  calculaCompromSaude() {
    tmpComprometimento[0] = this.state.saude;
    this.comprometimentoAtual();
  }

  async comprometimentoAtual() {
    let valor = 0;
    if (tmpComprometimento[0] !== undefined) {
      valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
    }
    const compr = C.comprometimentoAtual('Seguranca', valor);
    await this.setState({ comprometimento: compr });
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const { saude } = this.state;

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setSaude, saude)) {
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
            <Text style={styles.titulo}>Segurança</Text>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label]}>Sugestão de limite mensal:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.segur_txDireita}>{`${SegurancaScreen.comprometimento(SegurancaScreen.sugestLim()) * 100}%`}</Text>
              <Text style={styles.segur_txDireita}>{monetizar(SegurancaScreen.sugestLim())}</Text>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />

          <View style={styles.viewHorizontal}>
            <View style={styles.viewIcone}>
              <Image style={styles.imgIcone} source={imgConvenio} />
            </View>
            <View style={styles.viewPosIcone}>
              <View style={styles.viewVertical}>
                <Text style={styles.label}>Convênios de saúde:</Text>
                <TextInput
                  style={styles.segur_input}
                  keyboardType="numeric"
                  maxLength={10}
                  autoCorrect={false}
                  selectTextOnFocus
                  underlineColorAndroid="#EAEAEA"
                  onChangeText={text => this.setState({ saude: desmonetizar(text) })}
                  onEndEditing={() => this.calculaCompromSaude()}
                  value={monetizar(this.state.saude)}
                />
              </View>
            </View>
          </View>
          <View style={styles.separador} />
          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.segur_viewEsquerda} />
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.negrito, styles.segur_lbSeguridade]}>Seguros</Text>
                  <Text style={[styles.label, styles.negrito, styles.segur_txValor]}>Valor mensal</Text>
                  <Text style={[styles.label, styles.negrito, styles.segur_txValor]}>Patrimonio protegido</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgVida} />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Vida (24x renda):</Text>
                  <Text style={styles.segur_txValor}>{monetizar(SegurancaScreen.calculaVida())}</Text>
                  <Text style={styles.segur_txValor}>{monetizar(C.getSalLiq() * 24)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgImoveis} />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Residencial:</Text>
                  <Text style={styles.segur_txValor}>{monetizar(SegurancaScreen.calculaImoveis())}</Text>
                  <Text style={styles.segur_txValor}>{monetizar(C.getImoveis())}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgAuto} />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Auto:</Text>
                  <Text style={styles.segur_txValor}>{monetizar(SegurancaScreen.calculaAuto())}</Text>
                  <Text style={styles.segur_txValor}>{monetizar(C.getVeiculos())}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>Comprometimento com segurança:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>{`${this.calculaComprTotal()}%`}</Text>
            </View>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>Patrimônio protegido:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>{monetizar(this.calculaPatrimProt())}</Text>
            </View>
          </View>

          <View style={styles.separador} />
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Consumo" />
      </View>
    );
  }
}

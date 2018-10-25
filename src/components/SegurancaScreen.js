import React from 'react';
import { ScrollView, View, Text, TextInput, Image, Switch } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
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
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

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
      swVida: true,
      swImoveis: true,
      swAuto: true,
    };

    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
    C.salvar();
  }

  async montagem() {
    const segvida = C.getSegVida() > 0;
    const segimov = C.getSegImov() > 0;
    const segauto = C.getSegAuto() > 0;

    await this.setState({
      saude: C.getSaude(),
      swVida: C.getSaude() ? segvida : true,
      swImoveis: C.getSaude() ? segimov : true,
      swAuto: C.getSaude() ? segauto : true,
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

  switchVida() {
    const status = !this.state.swVida;
    this.setState({ swVida: status });
    tmpComprometimento[1] = status ? SegurancaScreen.calculaVida() : 0;
    this.comprometimentoAtual();
  }

  switchImoveis() {
    const status = !this.state.swImoveis;
    this.setState({ swImoveis: status });
    tmpComprometimento[2] = status ? SegurancaScreen.calculaImoveis() : 0;
    this.comprometimentoAtual();
  }

  switchAuto() {
    const status = !this.state.swAuto;
    this.setState({ swAuto: status });
    tmpComprometimento[2] = status ? SegurancaScreen.calculaAuto() : 0;
    this.comprometimentoAtual();
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const { saude, swVida, swImoveis, swAuto } = this.state;
    const segvida = SegurancaScreen.calculaVida();
    const segimov = SegurancaScreen.calculaImoveis();
    const segauto = SegurancaScreen.calculaAuto();

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setSaude, saude)) {
      return false;
    }

    if (!controle(this.abreErro, C, C.setSegVida, swVida ? segvida : 0)) {
      return false;
    }

    if (!controle(this.abreErro, C, C.setSegImov, swImoveis ? segimov : 0)) {
      return false;
    }

    if (!controle(this.abreErro, C, C.setSegAuto, swAuto ? segauto : 0)) {
      return false;
    }

    navigate(tela);

    return true;
  }

  render() {
    const { swVida, swImoveis, swAuto } = this.state;

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
              <View style={styles.viewSwitch}>
                <Switch onValueChange={() => this.switchVida()} value={this.state.swVida} />
              </View>
              {/* <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgVida} />
              </View> */}
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Vida (12x renda):</Text>
                  <Text style={styles.segur_txValor}>{swVida ? monetizar(SegurancaScreen.calculaVida()) : monetizar(0)}</Text>
                  <Text style={styles.segur_txValor}>{swVida ? monetizar(C.getSalLiq() * 12) : monetizar(0)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewSwitch}>
                <Switch onValueChange={() => this.switchImoveis()} value={this.state.swImoveis} />
              </View>
              {/* <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgImoveis} />
              </View> */}
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Residencial:</Text>
                  <Text style={styles.segur_txValor}>{swImoveis ? monetizar(SegurancaScreen.calculaImoveis()) : monetizar(0)}</Text>
                  <Text style={styles.segur_txValor}>{swImoveis ? monetizar(C.getImoveis()) : monetizar(0)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewSwitch}>
                <Switch onValueChange={() => this.switchAuto()} value={this.state.swAuto} />
              </View>
              {/* <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgAuto} />
              </View> */}
              <View style={styles.viewPosIcone}>
                <View style={styles.viewHorizontal}>
                  <Text style={[styles.label, styles.segur_lbSeguridade]}>Auto:</Text>
                  <Text style={styles.segur_txValor}>{swAuto ? monetizar(SegurancaScreen.calculaAuto()) : monetizar(0)}</Text>
                  <Text style={styles.segur_txValor}>{swAuto ? monetizar(C.getVeiculos()) : monetizar(0)}</Text>
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

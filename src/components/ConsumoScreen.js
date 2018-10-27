import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image, Picker, Platform } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import ModalMsg from './functions/ModalMsg';
import ModalPickerIOS from './functions/ModalPickerIOS';
import controle from './functions/controle';
import Ciclo from './functions/Ciclo';
import Erro from './functions/Erro';
import monetizar from './functions/monetizar';

const imgImoveis = require('../imgs/ic_home_white.png');
const imgAuto = require('../imgs/ic_car_white.png');

const C = new Ciclo();
let objErro = {};
const tmpComprometimento = [];

export default class ConsumoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

  static pickerIOSArray(step, max, tipo) {
    const arr = [];

    for (let i = step; i <= max; i += step) {
      const divisor = tipo === 'perc' ? 100 : 1;
      arr.push({ id: i, value: i / divisor, label: i.toString() });
    }
    return arr;
  }

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      modalAviso: false,
      modalImovPrazo: false,
      modalImovPerc: false,
      modalAutoPrazo: false,
      modalAutoPerc: false,
      imovelPrazo: 15,
      imovelPerc: 0.07,
      autoPrazo: 7,
      autoPerc: 0.03,
      comprometimento: 0,
    };

    this.continuar = false;
    this.permissaoContinuar = this.permissaoContinuar.bind(this);

    this.fechaAviso = this.fechaAviso.bind(this);
    this.abreAviso = this.abreAviso.bind(this);

    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);

    this.defImovPrazo = this.defImovPrazo.bind(this);
    this.defImovPerc = this.defImovPerc.bind(this);
    this.defAutoPrazo = this.defAutoPrazo.bind(this);
    this.defAutoPerc = this.defAutoPerc.bind(this);

    this.togglePicker = this.togglePicker.bind(this);

    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
    C.salvar();
  }

  async montagem() {
    await this.setState({
      imovelPrazo: C.getImovelInvestPrazo() || 15,
      imovelPerc: C.getImovelInvestPerc() || 0.07,
      autoPrazo: C.getVisualizacoesResultado() > 0 ? C.getAutoInvestPrazo() : 7,
      autoPerc: C.getVisualizacoesResultado() > 0 ? C.getAutoInvestPerc() : 0.03,
    });
    tmpComprometimento[0] = C.getSalLiq() * this.state.imovelPerc;
    tmpComprometimento[1] = C.getSalLiq() * this.state.autoPerc;
    await this.comprometimentoAtual();
    await this.setState({ carregado: true });
  }

  abreAviso(e) {
    objErro = e;
    this.setState({ modalAviso: true });
  }

  async fechaAviso() {
    await this.setState({ modalAviso: false });
    objErro = {};
  }

  abreErro(e) {
    objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    objErro = {};
  }

  planoImovel() {
    const renda = this.state.imovelPerc;
    const plano = C.planoImovel(renda);

    return plano;
  }

  planoAuto() {
    const renda = this.state.autoPerc;
    const plano = C.planoAuto(renda);

    return plano;
  }

  imovelInvest() {
    const prazo = this.state.imovelPrazo;
    const renda = this.state.imovelPerc;
    const invest = C.imovelInvest(prazo, renda);

    return invest;
  }

  autoInvest() {
    const prazo = this.state.autoPrazo;
    const renda = this.state.autoPerc;
    const invest = C.autoInvest(prazo, renda);

    return invest;
  }

  async defPercRendaImovel(valor) {
    await this.setState({ imovelPerc: valor });
    this.comprometimentoAtual();
  }

  async defPercRendaAuto(valor) {
    await this.setState({ autoPerc: valor });
    this.comprometimentoAtual();
  }

  defImovPrazo(valor) {
    this.setState({ imovelPrazo: valor });
  }

  defImovPerc(valor) {
    this.setState({ imovelPerc: valor });
  }

  defAutoPrazo(valor) {
    this.setState({ autoPrazo: valor });
  }

  defAutoPerc(valor) {
    this.setState({ autoPerc: valor });
  }

  async comprometimentoAtual() {
    let valor = 0;
    tmpComprometimento[0] = C.getSalLiq() * this.state.imovelPerc;
    tmpComprometimento[1] = C.getSalLiq() * this.state.autoPerc;

    if (tmpComprometimento[0] !== undefined) {
      valor = tmpComprometimento.reduce((prevVal, elem) => prevVal + elem);
    }

    const compr = C.comprometimentoAtual('Consumo', valor);
    await this.setState({ comprometimento: compr });
  }

  togglePicker(nome) {
    const { modalImovPrazo, modalImovPerc, modalAutoPrazo, modalAutoPerc } = this.state;
    switch (nome) {
      case 'ImovPrazo':
        this.setState({ modalImovPrazo: !modalImovPrazo });
        break;
      case 'ImovPerc':
        this.setState({ modalImovPerc: !modalImovPerc });
        break;
      case 'AutoPrazo':
        this.setState({ modalAutoPrazo: !modalAutoPrazo });
        break;
      case 'AutoPerc':
        this.setState({ modalAutoPerc: !modalAutoPerc });
        break;
      default:
    }
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    const { navigate } = this.props.navigation;

    const ImovelPrazo = this.state.imovelPrazo;
    const ImovelPerc = this.state.imovelPerc;
    const AutoPrazo = this.state.autoPrazo;
    const AutoPerc = this.state.autoPerc;

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setImovelInvestPrazo, ImovelPrazo)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setImovelInvestPerc, ImovelPerc)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setAutoInvestPrazo, AutoPrazo)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setAutoInvestPerc, AutoPerc)) {
      return false;
    }

    if (ImovelPrazo === 0 || ImovelPerc === 0 || AutoPrazo === 0 || AutoPerc === 0) {
      if (!this.continuar) {
        this.abreAviso(Erro.t11);
        return false;
      }
    }

    navigate(tela);

    return true;
  }

  async permissaoContinuar() {
    this.continuar = true;
    await this.fechaAviso();
    this.proxTela('Resultado');
  }

  static renderPickerItem(step, max, tipo) {
    const comp = [];
    comp.push(<Picker.Item key={0} label="0" value={0} />);
    for (let i = step; i <= max; i += step) {
      switch (tipo.toLowerCase()) {
        case 'perc':
          comp.push(<Picker.Item key={i} label={`${i}`} value={i / 100} />);
          break;
        default:
          comp.push(<Picker.Item key={i} label={`${i}`} value={i} />);
      }
    }
    return comp;
  }

  static renderImoveisPrazo() {
    return ConsumoScreen.renderPickerItem(1, 30, 'prazo');
  }

  static renderImoveisPerc() {
    return ConsumoScreen.renderPickerItem(1, 30, 'perc');
  }

  static renderAutoPrazo() {
    return ConsumoScreen.renderPickerItem(1, 10, 'prazo');
  }

  static renderAutoPerc() {
    return ConsumoScreen.renderPickerItem(1, 20, 'perc');
  }

  render() {
    const arrImovPrazo = ConsumoScreen.pickerIOSArray(1, 30, 'prazo');
    const arrImovPerc = ConsumoScreen.pickerIOSArray(1, 30, 'perc');
    const arrAutoPrazo = ConsumoScreen.pickerIOSArray(1, 10, 'prazo');
    const arrAutoPerc = ConsumoScreen.pickerIOSArray(1, 20, 'perc');

    if (!this.state.carregado) {
      return <Carregando />;
    }
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          {/* Camada Modal que intercepta avisos e exibe uma mensagem personalizada na tela */}
          <ModalMsg okCancela visivel={this.state.modalAviso} fechar={this.fechaAviso} prosseguir={this.permissaoContinuar} objErro={objErro} />
          {/* **************************************************************************** */}

          {/* Camada Modal que implementa as combos para IOS */}
          <ModalPickerIOS
            nome="ImovPrazo"
            visivel={this.state.modalImovPrazo}
            valor={this.state.imovelPrazo}
            opcoes={arrImovPrazo}
            fechar={this.togglePicker}
            retorno={this.defImovPrazo}
          />
          <ModalPickerIOS
            nome="ImovPerc"
            visivel={this.state.modalImovPerc}
            valor={this.state.imovelPerc}
            opcoes={arrImovPerc}
            fechar={this.togglePicker}
            retorno={this.defImovPerc}
          />
          <ModalPickerIOS
            nome="AutoPrazo"
            visivel={this.state.modalAutoPrazo}
            valor={this.state.autoPrazo}
            opcoes={arrAutoPrazo}
            fechar={this.togglePicker}
            retorno={this.defAutoPrazo}
          />
          <ModalPickerIOS
            nome="AutoPerc"
            visivel={this.state.modalAutoPerc}
            valor={this.state.autoPerc}
            opcoes={arrAutoPerc}
            fechar={this.togglePicker}
            retorno={this.defAutoPerc}
          />
          {/* **************************************************************************** */}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Consumo e</Text>
            <Text style={styles.titulo}>Ampliação do Patrimônio</Text>
          </View>

          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image style={styles.imgIcone} source={imgImoveis} />
              </View>

              <View style={styles.viewPosIcone}>
                <View style={styles.viewVertical}>
                  <View style={styles.viewHorizontal}>
                    <View style={styles.consumo_viewLabel}>
                      <Text style={styles.label}>Imóvel para investimento:</Text>
                    </View>
                    <View style={styles.consumo_viewValor}>
                      <Text style={styles.consumo_txValor}>{monetizar(this.imovelInvest())}</Text>
                    </View>
                  </View>

                  <View style={styles.viewHorizontal}>
                    <View style={styles.consumo_viewLabel}>
                      <View style={styles.viewHorizontal}>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>Prazo (anos):</Text>
                          <View style={styles.consumo_viewPicker}>
                            {Platform.OS === 'android' ? (
                              <Picker
                                style={styles.consumo_picker}
                                itemStyle={styles.consumo_itemPicker}
                                selectedValue={this.state.imovelPrazo}
                                onValueChange={itemValue => this.setState({ imovelPrazo: itemValue })}
                                prompt="Selecione a qtde. de anos"
                                mode="dialog"
                              >
                                {ConsumoScreen.renderImoveisPrazo()}
                              </Picker>
                            ) : (
                              <TouchableOpacity style={styles.home_tcEstCiv} onPress={() => this.togglePicker('ImovPrazo')}>
                                <Text style={styles.home_txEstCiv}>{this.state.imovelPrazo}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>% da renda:</Text>
                          <View style={styles.consumo_viewPicker}>
                            {Platform.OS === 'android' ? (
                              <Picker
                                style={styles.consumo_picker}
                                itemStyle={styles.consumo_itemPicker}
                                selectedValue={this.state.imovelPerc}
                                onValueChange={itemValue => this.defPercRendaImovel(itemValue)}
                                prompt="Selecione o percentual da renda líquida"
                                mode="dialog"
                              >
                                {ConsumoScreen.renderImoveisPerc()}
                              </Picker>
                            ) : (
                              <TouchableOpacity style={styles.home_tcEstCiv} onPress={() => this.togglePicker('ImovPerc')}>
                                <Text style={styles.home_txEstCiv}>{parseInt(this.state.imovelPerc * 100, 10)}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.consumo_viewValor}>
                      <Text style={styles.consumo_txValor}>{monetizar(this.planoImovel())}</Text>
                    </View>
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
                <Image style={styles.imgIcone} source={imgAuto} />
              </View>
              <View style={styles.viewPosIcone}>
                <View style={styles.viewVertical}>
                  <View style={styles.viewHorizontal}>
                    <View style={styles.consumo_viewLabel}>
                      <Text style={styles.label}>Carro novo ou troca:</Text>
                    </View>
                    <View style={styles.consumo_viewValor}>
                      <Text style={styles.consumo_txValor}>{monetizar(this.autoInvest())}</Text>
                    </View>
                  </View>

                  <View style={styles.viewHorizontal}>
                    <View style={styles.consumo_viewLabel}>
                      <View style={styles.viewHorizontal}>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>Prazo (anos):</Text>
                          <View style={styles.consumo_viewPicker}>
                            {Platform.OS === 'android' ? (
                              <Picker
                                style={styles.consumo_picker}
                                itemStyle={styles.consumo_itemPicker}
                                selectedValue={this.state.autoPrazo}
                                onValueChange={itemValue => this.setState({ autoPrazo: itemValue })}
                                prompt="Selecione a qtde. de anos"
                                mode="dialog"
                              >
                                {ConsumoScreen.renderAutoPrazo()}
                              </Picker>
                            ) : (
                              <TouchableOpacity style={styles.home_tcEstCiv} onPress={() => this.togglePicker('AutoPrazo')}>
                                <Text style={styles.home_txEstCiv}>{this.state.autoPrazo}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>% da renda:</Text>
                          <View style={styles.consumo_viewPicker}>
                            {Platform.OS === 'android' ? (
                              <Picker
                                style={styles.consumo_picker}
                                itemStyle={styles.consumo_itemPicker}
                                selectedValue={this.state.autoPerc}
                                onValueChange={itemValue => this.defPercRendaAuto(itemValue)}
                                prompt="Selecione o percentual da renda líquida"
                                mode="dialog"
                              >
                                {ConsumoScreen.renderAutoPerc()}
                              </Picker>
                            ) : (
                              <TouchableOpacity style={styles.home_tcEstCiv} onPress={() => this.togglePicker('AutoPerc')}>
                                <Text style={styles.home_txEstCiv}>{parseInt(this.state.autoPerc * 100, 10)}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.consumo_viewValor}>
                      <Text style={styles.consumo_txValor}>{monetizar(this.planoAuto())}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />
          <View style={styles.espacador} />

          <View style={styles.viewCentral}>
            <Text style={styles.aposent_vinheta}>Resumo</Text>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>Valor mensal:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>{monetizar(this.planoImovel() + this.planoAuto())}</Text>
            </View>
          </View>

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_lbCalculo, styles.label, styles.segur_lbTotal]}>Patrimônio a ser gerado:</Text>
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={[styles.segur_txDireita, styles.segur_lbTotal]}>{monetizar(this.imovelInvest() + this.autoInvest())}</Text>
            </View>
          </View>

          <View style={styles.espacador} />
          <View style={styles.separador} />
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Resultado" />
      </View>
    );
  }
}

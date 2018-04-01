import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image,
  Picker, } from 'react-native';

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
      imovelPrazo: 0,
      imovelPerc: 0,
      autoPrazo: 0,
      autoPerc: 0,
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

    const ImovelPrazo = this.state.imovelPrazo;
    const ImovelPerc = this.state.imovelPerc;
    const AutoPrazo = this.state.autoPrazo;
    const AutoPerc = this.state.autoPerc;

    // Validação das regras de negócio, registro e gravação de log
    if (!Controle(this.abreErro, C, C.setImovelInvestPrazo, ImovelPrazo)) { return false; }
    if (!Controle(this.abreErro, C, C.setImovelInvestPerc, ImovelPerc)) { return false; }
    if (!Controle(this.abreErro, C, C.setAutoInvestPrazo, AutoPrazo)) { return false; }
    if (!Controle(this.abreErro, C, C.setAutoInvestPerc, AutoPerc)) { return false; }

    navigate(tela);
  }

  renderPickerItem(step, max, tipo) {
    const comp = [];
    comp.push((<Picker.Item key={0} label='0' value={0} />));
    for (let i = step; i <= max; i += step) {
      switch (tipo.toLowerCase()) {
        case 'perc':
          comp.push((<Picker.Item key={i} label={`${i}`} value={i / 100} />));
          break;
        default:
        comp.push((<Picker.Item key={i} label={`${i}`} value={i} />));
      }
    }
    return comp;
  }

  renderImoveisPrazo() {
    return this.renderPickerItem(2, 20, 'prazo');
  }

  renderImoveisPerc() {
    return this.renderPickerItem(1, 10, 'perc');
  }

  renderAutoPrazo() {
    return this.renderPickerItem(1, 7, 'prazo');
  }

  renderAutoPerc() {
    return this.renderPickerItem(1, 10, 'perc');
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
          
          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewIcone}>
                <Image 
                  style={styles.imgIcone}
                  source={imgImoveis}
                />
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
                          <Text style={styles.label}>Prazo:</Text>
                          <View style={styles.consumo_viewPicker}>
                            <Picker
                              style={styles.consumo_pkEstCiv}
                              itemStyle={styles.consumo_pkItemEstCiv}
                              selectedValue={this.state.imovelPrazo}
                              onValueChange={(itemValue) => 
                                this.setState({ imovelPrazo: itemValue })
                              }
                              prompt='Selecione a qtde. de anos'
                              mode='dialog'
                            >
                              {this.renderImoveisPrazo()}
                            </Picker>
                          </View>
                        </View>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>% da renda:</Text>
                          <View style={styles.consumo_viewPicker}>
                            <Picker
                              style={styles.consumo_pkEstCiv}
                              itemStyle={styles.consumo_pkItemEstCiv}
                              selectedValue={this.state.imovelPerc}
                              onValueChange={(itemValue) => 
                                this.setState({ imovelPerc: itemValue })
                              }
                              prompt='Selecione a qtde. de anos'
                              mode='dialog'
                            >
                              {this.renderImoveisPerc()}
                            </Picker>
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
                <Image 
                  style={styles.imgIcone}
                  source={imgAuto}
                />
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
                          <Text style={styles.label}>Prazo:</Text>
                          <View style={styles.consumo_viewPicker}>
                            <Picker
                              style={styles.consumo_pkEstCiv}
                              itemStyle={styles.consumo_pkItemEstCiv}
                              selectedValue={this.state.autoPrazo}
                              onValueChange={(itemValue) => 
                                this.setState({ autoPrazo: itemValue })
                              }
                              prompt='Selecione a qtde. de anos'
                              mode='dialog'
                            >
                              {this.renderAutoPrazo()}
                            </Picker>
                          </View>
                        </View>
                        <View style={styles.viewCompHoriz}>
                          <Text style={styles.label}>% da renda:</Text>
                          <View style={styles.consumo_viewPicker}>
                            <Picker
                              style={styles.consumo_pkEstCiv}
                              itemStyle={styles.consumo_pkItemEstCiv}
                              selectedValue={this.state.autoPerc}
                              onValueChange={(itemValue) => 
                                this.setState({ autoPerc: itemValue })
                              }
                              prompt='Selecione a qtde. de anos'
                              mode='dialog'
                            >
                              {this.renderAutoPerc()}
                            </Picker>
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
          <View style={styles.separador} />

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

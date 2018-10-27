import React from 'react';
import firebase from 'react-native-firebase';
import { View, TouchableOpacity, ScrollView, Text, TextInput, Picker, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import Rodape from './functions/Rodape';
import Carregando from './functions/Carregando';
import ModalMsg from './functions/ModalMsg';
import ModalPickerIOS from './functions/ModalPickerIOS';
import Erro from './functions/Erro';
import controle from './functions/controle';
import validaEmail from './functions/validaEmail';
import Ciclo from './functions/Ciclo';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';
import SliderFilhos from './home/SliderFilhos';
// import SliderSalario from './home/SliderSalario';
import ModalPoliticaPrivacidade from './termos/ModalPoliticaPrivacidade';
import ControlePrivacidade from './functions/ControlePrivacidade';

const C = new Ciclo();
let objErro = {};

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida', true);

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      modalPrivacidade: false,
      modalEstCiv: false,
      nome: '',
      nasc: '',
      estCiv: 1,
      filhos: 0,
      salLiq: 0,
      iniCarr: '',
      email: '',
      comprometimento: 0,
    };

    this.nome = null;
    this.email = null;
    this.refNome = elem => {
      this.nome = elem;
    };
    this.refEmail = elem => {
      this.email = elem;
    };
    this.focusNome = () => {
      if (this.nome) {
        this.nome.focus();
      }
    };
    this.focusEmail = () => {
      if (this.email) {
        this.email.focus();
      }
    };

    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
    this.proxTela = this.proxTela.bind(this);

    this.togglePrivacidade = this.togglePrivacidade.bind(this);
    this.toggleEstCiv = this.toggleEstCiv.bind(this);

    this.defFilhos = this.defFilhos.bind(this);
    this.defSalario = this.defSalario.bind(this);
    this.defEstCiv = this.defEstCiv.bind(this);
  }

  async componentDidMount() {
    await this.montagem();
    C.addAcessoApp();
  }

  static getEstCiv(estado) {
    switch (estado) {
      case 1:
        return 'Solteiro';
      case 2:
        return 'Casado/União Estável';
      case 3:
        return 'Divorciado';
      case 4:
        return 'Viúvo';
      case 5:
        return 'Separado';
      default:
        return 'Não definido';
    }
  }

  async montagem() {
    // mock para carregamento mais rápido
    // if (this.props.navigation) {
    //   const { params } = this.props.navigation.state;
    //   if (params) {
    //     await this.setState(params);
    //   }
    // }
    // const t2 = new Date();
    let modalPriv;
    const control = new ControlePrivacidade();

    if (C.getPoliticaPrivacidade() || control.getAceitouPrivacidade()) {
      modalPriv = false;
    } else {
      modalPriv = true;
    }

    await this.setState({
      modalPrivacidade: modalPriv,
      nome: C.getNome(),
      nasc: C.getNasc(),
      estCiv: C.getEstCivil(),
      filhos: C.getFilhos(),
      salLiq: C.getSalLiq(),
      iniCarr: C.getIniCarreira(),
      email: C.getEmail() || firebase.auth().currentUser.email,
      carregado: true,
    });
    // const t3 = new Date();
    // console.log('t1', t1);
    // console.log('t2', t2, t2 - t1);
    // console.log('t3', t3, t3 - t2);
  }

  // ************************************************************
  // Funções abreErro() e fechaErro devem ser incluídas em todos
  // os componentes de tela para possibilitar o funcionamento
  // da tela personalizada de erros.
  // ************************************************************
  abreErro(e) {
    objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    objErro = {};
  }
  // ************************************************************

  defFilhos(valor) {
    this.setState({ filhos: valor });
  }

  defSalario(valor) {
    this.setState({ salLiq: valor });
  }

  defEstCiv(valor) {
    this.setState({ estCiv: valor });
  }

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.

    const { push } = this.props.navigation;

    const { nome, nasc, estCiv, filhos, salLiq, iniCarr, email } = this.state;

    // -- Validações primária dos campos --
    // Nome
    if (nome.trim().length < 6) {
      this.abreErro(Erro.t01, 0);
      this.focusNome();
      return false;
    }
    if (!nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ. -]+$/)) {
      this.abreErro(Erro.t02, 0);
      this.focusNome();
      return false;
    }

    // Data Nasc
    if (nasc === '') {
      this.abreErro(Erro.t03, 0);
      return false;
    }

    // Estado Civil
    if (estCiv === 0) {
      this.abreErro(Erro.t04, 0);
      return false;
    }

    // Filhos não possui validão primária, apenas secundária

    // Salário Líquido
    if (salLiq <= 0 || salLiq >= 1000000) {
      this.abreErro(Erro.t05, 0);
      return false;
    }

    // Data início carreira
    if (iniCarr === '') {
      this.abreErro(Erro.t06, 0);
      return false;
    }

    // Email
    if (!validaEmail(email)) {
      this.abreErro(Erro.t07, 0);
      this.focusEmail();
      return false;
    }

    // Validação das regras de negócio, registro e gravação de log
    if (!controle(this.abreErro, C, C.setNome, nome)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setNasc, nasc)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setEstCivil, estCiv)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setFilhos, filhos)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setSalLiq, salLiq)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setIniCarreira, iniCarr)) {
      return false;
    }
    if (!controle(this.abreErro, C, C.setEmail, email)) {
      return false;
    }

    // Após passar em todos os teste, abre a próxima tela do formulário
    push(tela);

    return true;
  }

  togglePrivacidade() {
    const { modalPrivacidade } = this.state;
    this.setState({ modalPrivacidade: !modalPrivacidade });
  }

  toggleEstCiv() {
    const { modalEstCiv } = this.state;
    this.setState({ modalEstCiv: !modalEstCiv });
  }

  render() {
    const arrEstCiv = [
      { id: 1, value: 1, label: 'Solteiro' },
      { id: 2, value: 2, label: 'Casado/União Estável' },
      { id: 3, value: 3, label: 'Divorciado' },
      { id: 4, value: 4, label: 'Viúvo' },
      { id: 5, value: 5, label: 'Separado' },
    ];

    if (!this.state.carregado) {
      return <Carregando />;
    }
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}
          {/* Camada Modal que apresenta a politica de privacidade do App                  */}
          <ModalPoliticaPrivacidade visivel={this.state.modalPrivacidade} fechar={this.togglePrivacidade} tela="home" />
          {/* **************************************************************************** */}
          {Platform.OS === 'android' ? null : (
            <ModalPickerIOS
              visivel={this.state.modalEstCiv}
              valor={this.state.estCiv}
              opcoes={arrEstCiv}
              fechar={this.toggleEstCiv}
              retorno={this.defEstCiv}
            />
          )}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Dados básicos</Text>
          </View>

          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <Text style={styles.label}>Nome completo:</Text>
            <TextInput
              ref={this.refNome}
              style={styles.home_inpNome}
              autoCapitalize="characters"
              maxLength={50}
              selectTextOnFocus
              autoCorrect={false}
              underlineColorAndroid="#EAEAEA"
              onChangeText={text => this.setState({ nome: text.toUpperCase() })}
              value={this.state.nome}
            />
          </View>

          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              ref={this.refEmail}
              style={styles.home_inpEmail}
              keyboardType="email-address"
              maxLength={40}
              autoCorrect={false}
              underlineColorAndroid="#EAEAEA"
              onChangeText={text => this.setState({ email: text.toLowerCase() })}
              value={this.state.email}
            />
          </View>

          <View style={styles.espacador} />

          <View style={styles.viewVertical}>
            <View style={styles.viewHorizontal}>
              <View style={styles.viewCompHoriz}>
                <Text style={styles.label}>Data de nascimento:</Text>
                <DatePicker
                  style={styles.home_dtNasc}
                  date={this.state.nasc}
                  mode="date"
                  placeholder="Selecione uma data"
                  androidMode="spinner"
                  format="DD/MM/YYYY"
                  minDate="01/01/1900"
                  maxDate="31/12/2050"
                  confirmBtnText="Ok"
                  cancelBtnText="Cancelar"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      marginLeft: 0,
                    },
                  }}
                  onDateChange={nasc => {
                    this.setState({ nasc });
                  }}
                />
              </View>
              <View style={styles.viewCompHoriz}>
                <Text style={styles.label}>Estado Civil:</Text>
                <View style={styles.home_viewEstCiv}>
                  {Platform.OS === 'android' ? (
                    <Picker
                      style={styles.home_pkEstCiv}
                      itemStyle={styles.home_pkItemEstCiv}
                      selectedValue={this.state.estCiv}
                      onValueChange={itemValue => this.setState({ estCiv: itemValue })}
                      prompt="Selecione"
                      mode="dialog"
                    >
                      <Picker.Item label="Solteiro" value={1} />
                      <Picker.Item label="Casado/União Estável" value={2} />
                      <Picker.Item label="Divorciado" value={3} />
                      <Picker.Item label="Viúvo" value={4} />
                      <Picker.Item label="Separado" value={5} />
                    </Picker>
                  ) : (
                    <TouchableOpacity style={styles.home_tcEstCiv} onPress={() => this.toggleEstCiv()}>
                      <Text style={styles.home_txEstCiv}>{HomeScreen.getEstCiv(this.state.estCiv)}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.espacador} />

          <SliderFilhos inicial={this.state.filhos} retorno={this.defFilhos} />

          <View style={styles.espacador} />

          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Primeiro emprego:</Text>
              <DatePicker
                style={styles.home_dtIniCarr}
                date={this.state.iniCarr}
                mode="date"
                placeholder="Selecione uma data"
                androidMode="spinner"
                format="DD/MM/YYYY"
                minDate="01/01/1900"
                maxDate="31/12/2050"
                confirmBtnText="Ok"
                cancelBtnText="Cancelar"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    marginLeft: 0,
                  },
                }}
                onDateChange={iniCarr => {
                  this.setState({ iniCarr });
                }}
              />
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Salário líquido atual:</Text>
              <TextInput
                ref={this.salLiq}
                style={styles.home_inpSal}
                keyboardType="numeric"
                maxLength={10}
                autoCorrect={false}
                underlineColorAndroid="#EAEAEA"
                onChangeText={text => this.setState({ salLiq: desmonetizar(text) })}
                value={monetizar(this.state.salLiq)}
              />
            </View>
          </View>
        </ScrollView>

        <Rodape valor={this.state.comprometimento} funcProxTela={this.proxTela} tela="Patrimonio" />
      </View>
    );
  }
}

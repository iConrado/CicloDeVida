import React from 'react';
import { 
  View, 
  ScrollView,
  Text, 
  TextInput,
  Picker, 
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Slider from 'react-native-slider';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Erro from './functions/Erro';
import Controle from './functions/Controle';
import monetizar from './functions/monetizar';
//import desmonetizar from './functions/desmonetizar';
import validaEmail from './functions/validaEmail';
import Ciclo from './functions/Ciclo';

const C = new Ciclo();
let objErro = {};

export default class HomeScreen extends React.Component {
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
      nome: '',
      nasc: '',
      estCiv: 0,
      filhos: 0,
      salLiq: 0,
      iniCarr: '',
      email: '',
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);
  }

  componentWillMount() {
    this.setState({
      nome: 'BRUNO P. SIQUEIRA',
      nasc: '01/01/1980',
      estCiv: 2,
      filhos: 1,
      salLiq: 8550,
      iniCarr: '05/06/2000',
      email: 'brunop@gmail.com'
    });
  }

  //************************************************************
  // Funções abreErro() e fechaErro devem ser incluídas em todos 
  // os componentes de tela para possibilitar o funcionamento 
  // da tela personalizada de erros.
  //************************************************************
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
  //************************************************************

  proxTela(tela) {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.

    const { navigate } = this.props.navigation;
    
    const nome = this.state.nome;
    const nasc = this.state.nasc;
    const estCiv = this.state.estCiv;
    const filhos = this.state.filhos;
    const salLiq = this.state.salLiq;
    const iniCarr = this.state.iniCarr;
    const email = this.state.email;

    // -- Validações primária dos campos --
    // Nome
    if (nome.trim().length < 6) {
      this.abreErro(Erro.t01, 0);
      this.refs.nome.focus();
      return false;
    }
    if (!nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ. -]+$/)) {
      this.abreErro(Erro.t02, 0);
      this.refs.nome.focus();
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
      this.refs.salLiq.focus();
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
      this.refs.email.focus();
      return false;
    }
    
    // Validação das regras de negócio, registro e gravação de log
    if (!Controle(this.abreErro, C, C.setNome, nome)) { return false; }
    if (!Controle(this.abreErro, C, C.setNasc, nasc)) { return false; }
    if (!Controle(this.abreErro, C, C.setEstCivil, estCiv)) { return false; }
    if (!Controle(this.abreErro, C, C.setFilhos, filhos)) { return false; }
    if (!Controle(this.abreErro, C, C.setSalLiq, salLiq)) { return false; }
    if (!Controle(this.abreErro, C, C.setIniCarreira, iniCarr)) { return false; }
    if (!Controle(this.abreErro, C, C.setEmail, email)) { return false; }

    // Após passar em todos os teste, abre a próxima tela do formulário
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
          <Text style={styles.titulo}>Dados básicos</Text>
        </View>
        <View style={styles.viewVertical}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput
            ref='nome'
            style={styles.home_inpNome}
            autoCapitalize='characters'
            maxLength={50}
            selectTextOnFocus
            autoCorrect={false}
            underlineColorAndroid='#EAEAEA'
            onChangeText={(text) => this.setState({ nome: text })}
            value={this.state.nome}
          />
        </View>
        <View style={styles.viewVertical}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            ref='email'
            style={styles.home_inpEmail}
            keyboardType='email-address'
            maxLength={40}
            autoCorrect={false}
            underlineColorAndroid='#EAEAEA'
            onChangeText={(text) => this.setState({ email: text.toLowerCase() })}
            value={this.state.email}
          />
        </View>
        <View style={styles.viewVertical}>
          <View style={styles.viewHorizontal}>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Data Nasc.:</Text>
              <DatePicker
                style={styles.home_dtNasc}
                date={this.state.nasc}
                mode='date'
                placeholder='Selecione uma data'
                format='DD/MM/YYYY'
                minDate='01/01/1900'
                maxDate='31/12/2050'
                confirmBtnText='Ok'
                cancelBtnText='Cancelar'
                showIcon={false}
                customStyles={{
                  dateInput: {
                    marginLeft: 0
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(nasc) => { this.setState({ nasc }); }}
              />
            </View>
            <View style={styles.viewCompHoriz}>
              <Text style={styles.label}>Estado Civil:</Text>
              <View style={styles.home_viewEstCiv}>
                <Picker
                  style={styles.home_pkEstCiv}
                  selectedValue={this.state.estCiv}
                  onValueChange={(itemValue) => this.setState({ estCiv: itemValue })}
                  prompt='Selecione'
                  mode='dropdown'
                >
                  <Picker.Item label='Solteiro' value={1} />
                  <Picker.Item label='Casado/União Estável' value={2} />
                  <Picker.Item label='Divorciado' value={3} />
                  <Picker.Item label='Viúvo' value={4} />
                  <Picker.Item label='Separado' value={5} />
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewVertical}>
          <Text style={styles.label}>Filhos:</Text>
          <View style={styles.viewHorizontal}>
            <Slider 
              style={styles.home_slFilhos}
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.filhos}
              onValueChange={(value) => this.setState({ filhos: value })}
            />
            <Text style={styles.home_txFilhos}>{this.state.filhos}</Text>
          </View>
        </View>
        {/*Teste com salário com slider*/}
        <View style={styles.viewVertical}>
          <Text style={styles.label}>Início da carreira:</Text>
          <DatePicker
            style={styles.home_dtIniCarr}
            date={this.state.iniCarr}
            mode='date'
            placeholder='Selecione uma data'
            format='DD/MM/YYYY'
            minDate='01/01/1900'
            maxDate='31/12/2050'
            confirmBtnText='Ok'
            cancelBtnText='Cancelar'
            showIcon={false}
            customStyles={{
              dateInput: {
                marginLeft: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(iniCarr) => { this.setState({ iniCarr }); }}
          />
        </View>
        <View style={styles.viewVertical}>
          <Text style={styles.label}>Salário Líquido:</Text>
          <View style={styles.viewHorizontal}>
              <Slider 
                style={styles.home_slSalLiq}
                minimumValue={0}
                maximumValue={50000}
                step={100}
                minimumTrackTintColor='#14567A'
                thumbTintColor='#14567A'
                value={this.state.salLiq}
                onValueChange={(value) => this.setState({ salLiq: value })}
              />
            <Text style={styles.home_txSalLiq}>{monetizar(this.state.salLiq)}</Text>
          </View>
        </View>
        {/*Fim do testte*/}

        {/*Código antigo - salário em TextInput*/}
        {/*<View style={styles.viewHorizontal}>
          <View style={styles.viewCompHoriz}>
            <Text style={styles.label}>Salário Líquido:</Text>
            <TextInput
              ref='salLiq'
              style={styles.home_inpSal}
              keyboardType='numeric'
              maxLength={10}
              autoCorrect={false}
              underlineColorAndroid='#EAEAEA'
              onChangeText={(text) => this.setState({ salLiq: desmonetizar(text) })}
              value={monetizar(this.state.salLiq)}
            />
          </View>
          <View style={styles.viewCompHoriz}>
            <Text style={styles.label}>Início da carreira:</Text>
            <DatePicker
              style={styles.home_dtIniCarr}
              date={this.state.iniCarr}
              mode='date'
              placeholder='Selecione uma data'
              format='DD/MM/YYYY'
              minDate='01/01/1900'
              maxDate='31/12/2050'
              confirmBtnText='Ok'
              cancelBtnText='Cancelar'
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(iniCarr) => { this.setState({ iniCarr }); }}
            />
          </View>
        </View>*/}
        <View style={styles.viewBotoes}>
          <TouchableOpacity 
            style={styles.botao}
            onPress={() => this.proxTela('Patrimonio')}
          >
            <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

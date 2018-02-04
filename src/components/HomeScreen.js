import React from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView,
  Text, 
  TextInput,
  Button,
  Picker,
  Slider, } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Erro from './functions/Erro';
import Controle from './functions/Controle';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';
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
    /*C.setNome = C.setNome.bind(this);
    C.setNasc = C.setNasc.bind(this);
    C.setEstCivil = C.setEstCivil.bind(this);
    C.setFilhos = C.setFilhos.bind(this);
    C.setSalLiq = C.setSalLiq.bind(this);
    C.setIniCarreira = C.setIniCarreira.bind(this);
    C.setEmail = C.setEmail.bind(this);*/
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
    navigate(tela, { Ciclo: C });
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
        <Text style={styles.label}>Nome completo:</Text>
        <TextInput
          ref='nome'
          style={styles.inpNome}
          autoCapitalize='characters'
          maxLength={50}
          selectTextOnFocus
          autoCorrect={false}
          underlineColorAndroid='#EAEAEA'
          onChangeText={(text) => this.setState({ nome: text })}
          value={this.state.nome}
        />
        <View style={styles.viewHorizontal}>
          <View style={styles.compHoriz}>
            <Text style={styles.label}>Data Nasc.:</Text>
            <DatePicker
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
          <View style={styles.compHoriz}>
            <Text style={styles.label}>Estado Civil:</Text>
            <View style={styles.viewEstCiv}>
              <Picker
                style={styles.estCiv}
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
        <Text style={styles.label}>Filhos:</Text>
        <View style={styles.viewHorizontal}>
          <Slider 
            style={styles.slFilhos}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={this.state.filhos}
            onSlidingComplete={(value) => this.setState({ filhos: value })}
          />
          <Text style={styles.filhos}>{this.state.filhos}</Text>
        </View>
        <View style={styles.viewHorizontal}>
          <View style={styles.compHoriz}>
            <Text style={styles.label}>Salário Líquido:</Text>
            <TextInput
              ref='salLiq'
              style={styles.inpSal}
              keyboardType='numeric'
              maxLength={10}
              autoCorrect={false}
              underlineColorAndroid='#EAEAEA'
              onChangeText={(text) => this.setState({ salLiq: desmonetizar(text) })}
              value={monetizar(this.state.salLiq)}
            />
          </View>
          <View style={styles.compHoriz}>
            <Text style={styles.label}>Início da carreira:</Text>
            <DatePicker
              style={styles.iniCarr}
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
        </View>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            ref='email'
            style={styles.inpEmail}
            keyboardType='email-address'
            maxLength={40}
            autoCorrect={false}
            underlineColorAndroid='#EAEAEA'
            onChangeText={(text) => this.setState({ email: text.toLowerCase() })}
            value={this.state.email}
          />
        <View style={styles.viewBotoes}>
          <Button 
            title='Próximo'
            onPress={() => this.proxTela('Patrimonio')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  viewTitulo: {
    width: '100%',
    alignItems: 'center',
  },
  viewBotoes: {
    width: '100%',
    alignItems: 'center',
  },
  viewHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  compHoriz: {
    width: '50%',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#14567A',
  },
  label: {
    color: '#666',
  },
  filhos: {
    width: '10%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  slFilhos: {
    width: '90%',
    height: 40,
  },
  inpNome: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  inpSal: {
    width: '90%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  inpEmail: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  estCiv: {
    width: '100%',
    height: 38,
    color: '#5E5E5E',
  },
  viewEstCiv: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
  iniCarr: {
    width: '100%',
  }
});

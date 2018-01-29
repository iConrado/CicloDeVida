import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  Button,
  Picker,
  Slider } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Cabecalho from './functions/Cabecalho';
import EstiloVoltar from './functions/EstiloVoltar';
import ModalErro from './functions/ModalErro';
import Erro from './functions/Erro';
import monetizar from './functions/monetizar';
import desmonetizar from './functions/desmonetizar';
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
    
    const nome = this.state.nome;
    const nasc = this.state.nasc;
    const estCiv = this.state.estCiv;
    //const filhos = this.state.filhos;
    const salLiq = this.state.salLiq;
    const iniCarr = this.state.iniCarr;

    // Validações de campos primária

    // Nome
    if (nome.trim().length < 6) {
      this.abreErro(Erro.t01, 0);
      this.refs.nome.focus();
      return false;
    }
    if (!nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ -]+$/)) {
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
      return false;
    }

    // Data início carreira
    if (iniCarr === '') {
      this.abreErro(Erro.t06, 0);
      return false;
    }

    navigate(tela);
  }
  
  render() {
    return (
      <View style={styles.container}>
        {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
        <ModalErro 
          visivel={this.state.modalErro}
          fechar={this.fechaErro}
          objErro={objErro}
        />
        {/* **************************************************************************** */}
        <View style={styles.viewTitulo}>
          <Text>Dados básicos</Text>
        </View>
        <Text>Nome completo:</Text>
        <TextInput
          ref='nome'
          style={styles.inpNome}
          autoCapitalize='characters'
          maxLength={50}
          selectTextOnFocus
          onChangeText={(text) => this.setState({ nome: text })}
          value={this.state.nome}
        />
        <View style={styles.viewHorizontal}>
          <View style={styles.compHoriz}>
            <Text>Data Nasc.:</Text>
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
            <Text>Estado Civil:</Text>
            <Picker
              selectedValue={this.state.estCiv}
              onValueChange={(itemValue) => this.setState({ estCiv: itemValue })}
              prompt='Selecione'
            >
              <Picker.Item label='Selecione' value={0} />
              <Picker.Item label='Solteiro' value={1} />
              <Picker.Item label='Casado/União Estável' value={2} />
              <Picker.Item label='Divorciado' value={3} />
              <Picker.Item label='Viúvo' value={4} />
              <Picker.Item label='Separado' value={5} />
            </Picker>
          </View>
        </View>
        <Text>Filhos:</Text>
        <View style={styles.viewHorizontal}>
          <Slider 
            style={styles.slFilhos}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={this.state.filhos}
            onSlidingComplete={(value) => this.setState({ filhos: value })}
          />
          <Text>{this.state.filhos}</Text>
        </View>
        <View style={styles.viewHorizontal}>
          <View style={styles.compHoriz}>
            <Text>Salário Líquido:</Text>
            <TextInput
              ref='salLiq'
              style={styles.inpSal}
              keyboardType='numeric'
              maxLength={10}
              onChangeText={(text) => this.setState({ salLiq: desmonetizar(text) })}
              value={monetizar(this.state.salLiq)}
            />
          </View>
          <View style={styles.compHoriz}>
            <Text>Início da carreira:</Text>
            <DatePicker
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
        <View style={styles.viewBotoes}>
          <Button 
            title='Próximo'
            onPress={() => this.proxTela('Patrimonio')}
          />
          <Text />
          <Text />
          <Text />
          <Text />
          <Button 
            title='Teste de erro '
            onPress={() => this.abreErro()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
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
    alignItems: 'center',
  },
  compHoriz: {
    width: '50%',
  },
  slFilhos: {
    width: '90%',
    height: 40,
  },
  inpNome: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
  inpSal: {
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
});

import React from 'react';
import firebase from 'firebase';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { TextInput, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

import HomeScreen from '../src/components/HomeScreen';
import mock from '../src/components/functions/mock';

jest.mock('../src/components/functions/Ciclo');

const auth = () => ({ currentUser: { email: '' } });

const fbAuth = sinon.stub(firebase, 'auth');
fbAuth.callsFake(auth);

const nav = tela => {
  console.log(tela);
};
const app = shallow(<HomeScreen navigation={{ navigate: nav }} />);
const appMock = shallow(<HomeScreen navigation={{ state: { params: mock }, navigate: nav }} />);

describe('HomeScreen', async () => {
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('verifica os valores iniciais de uma nova simulação', async () => {
    await app.instance().componentDidMount();
    await app.update();
    expect(app.state('nome')).toBe('');
    expect(app.state('nasc')).toBe('');
    expect(app.state('estCiv')).toBe(0);
    expect(app.state('filhos')).toBe(0);
    expect(app.state('salLiq')).toBe(0);
    expect(app.state('iniCarr')).toBe('');
    expect(app.state('email')).toBe('');
    expect(app.state('comprometimento')).toBe(0);
  });

  it.skip('verifica os valores iniciais de um mock', () => {
    expect(appMock.state('nome')).toBe('BRUNO P. SIQUEIRA');
    expect(appMock.state('nasc')).toBe('25/01/1980');
    expect(appMock.state('estCiv')).toBe(2);
    expect(appMock.state('filhos')).toBe(1);
    expect(appMock.state('salLiq')).toBe(8550);
    expect(appMock.state('iniCarr')).toBe('05/06/2000');
    expect(appMock.state('email')).toBe('brunop@gmail.com');
    expect(appMock.state('comprometimento')).toBe(0);
  });

  // TextInput Nome
  it('nome em maiusculo', () => {
    app
      .find(TextInput)
      .at(0)
      .simulate('changeText', 'BRUNO P. SIQUEIRA');
    expect(app.state('nome')).toBe('BRUNO P. SIQUEIRA');
  });

  it('nome em minusculo > maiusculo', () => {
    app
      .find(TextInput)
      .at(0)
      .simulate('changeText', 'bruno p. siqueira');
    expect(app.state('nome')).toBe('BRUNO P. SIQUEIRA');
  });

  // TextInput email
  it('email em minusculo', async () => {
    app
      .find(TextInput)
      .at(1)
      .simulate('changeText', 'brunop@gmail.com');
    expect(app.state('email')).toBe('brunop@gmail.com');
  });

  it('email em minusculo > maiusculo', () => {
    app
      .find(TextInput)
      .at(1)
      .simulate('changeText', 'BRUNOp@gmail.com');
    expect(app.state('email')).toBe('brunop@gmail.com');
  });

  // DatePicker Nascimento
  it('altera o valor do DatePicker Nasc', () => {
    app
      .find(DatePicker)
      .at(0)
      .simulate('dateChange', '15/01/1980');
    expect(app.state('nasc')).toBe('15/01/1980');
  });

  // Picker Estado Civil
  it('zera o Picker', async () => {
    app
      .find(Picker)
      .at(0)
      .simulate('valueChange', 0);
    expect(app.state('estCiv')).toBe(0);
  });

  it('altera o valor do Picker', () => {
    app
      .find(Picker)
      .at(0)
      .simulate('valueChange', 3);
    expect(app.state('estCiv')).toBe(3);
  });

  // DatePicker Nascimento
  it('altera o valor do DatePicker IniCarr', () => {
    app
      .find(DatePicker)
      .at(1)
      .simulate('dateChange', '14/04/2008');
    expect(app.state('iniCarr')).toBe('14/04/2008');
  });

  it('proxTela com valores válidos', () => {
    const func = jest.fn(() => {
      appMock.instance().proxTela('Patrimonio');
    });
    func();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('definição de valores vindos de componentes independentes', () => {
    const funcFilhos = jest.fn(() => {
      app.instance().defFilhos(3);
    });

    const funcSalario = jest.fn(() => {
      app.instance().defSalario(10000);
    });

    funcFilhos();
    funcSalario();

    expect(app.state('filhos')).toBe(3);
    expect(app.state('salLiq')).toBe(10000);
  });

  it('abre e fecha modal de Msg', () => {
    const funcAbre = jest.fn(() => {
      app.instance().abreErro({ erro: 'erro' });
    });

    const funcFecha = jest.fn(() => {
      app.instance().fechaErro({ erro: 'erro' });
    });

    funcAbre();
    expect(app.state('modalMsg')).toBe(true);

    funcFecha();
    expect(app.state('modalMsg')).toBe(false);
  });

  it('proxTela com valores inválidos', () => {
    const func = jest.fn(() => {
      appMock.instance().proxTela('Patrimonio');
    });

    appMock.setState({ nome: '' });
    func();

    appMock.setState({ nome: '84310874' });
    func();

    appMock.setState({ nome: 'BRUNO P. SIQUEIRA', nasc: '' });
    func();

    appMock.setState({ nasc: '25/01/1980', estCiv: 0 });
    func();

    appMock.setState({ estCiv: 2, salLiq: 0 });
    func();

    appMock.setState({ salLiq: 8550, iniCarr: '' });
    func();

    appMock.setState({ iniCarr: '05/06/2000', email: '' });
    func();

    expect(func).toHaveBeenCalledTimes(7);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { Text } from 'react-native';
import PatrimonioScreen from '../src/components/PatrimonioScreen';
import Ciclo from '../src/components/functions/Ciclo';

const nav = tela => {
  console.log(tela);
};
const app = shallow(<PatrimonioScreen />);
const appMock = shallow(<PatrimonioScreen navigation={{ state: { params: { teste: 'teste' } }, navigate: nav }} />);
const C = new Ciclo();

describe('PatrimonioScreen', async () => {
  beforeAll(() => {
    C.setSalLiq(8550);
    C.setIniCarreira('01/01/2000');
  });

  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('verifica os valores iniciais de uma nova simulação', () => {
    expect(app.state('invest')).toBe(0);
    expect(app.state('imoveis')).toBe(0);
    expect(app.state('veiculos')).toBe(0);
    expect(app.state('comprometimento')).toBe(0);
  });

  it('testa definicao de valores vindos dos componentes independentes', () => {
    app.instance().defInvest(40000);
    app.instance().defImoveis(100000);
    app.instance().defVeiculos(35000);
    expect(app.state('invest')).toBe(40000);
    expect(app.state('imoveis')).toBe(100000);
    expect(app.state('veiculos')).toBe(35000);
  });

  it('testa retorno do Patrimonio Formado zerado', () => {
    app.instance().defInvest(0);
    app.instance().defImoveis(0);
    app.instance().defVeiculos(0);
    const test = app.instance().patrimonioFormado();
    const obj = <Text style={{ alignSelf: 'center', textAlign: 'center' }}>R$ 0</Text>;
    expect(test).toMatchObject(obj);
  });

  it('testa retorno do Patrimonio Formado abaixo do esperado', () => {
    console.log(C.patrimonioEsperado());
    app.instance().defInvest(1000);
    app.instance().defImoveis(1000);
    app.instance().defVeiculos(1000);
    const test = app.instance().patrimonioFormado();
    const obj = <Text style={{ alignSelf: 'center', color: 'red', textAlign: 'center' }}>R$ 3.000</Text>;
    expect(test).toMatchObject(obj);
  });

  it('testa retorno do Patrimonio Formado acima do esperado', () => {
    app.instance().defInvest(100000);
    app.instance().defImoveis(100000);
    app.instance().defVeiculos(35000);
    const test = app.instance().patrimonioFormado();
    const obj = <Text style={{ alignSelf: 'center', color: 'green', textAlign: 'center' }}>R$ 235.000</Text>;
    expect(test).toMatchObject(obj);
  });

  it('proxTela com valores válidos', () => {
    const func = jest.fn(() => {
      appMock.instance().proxTela('Reserva');
    });
    func();
    expect(func).toHaveBeenCalledTimes(1);
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

    func();

    expect(func).toHaveBeenCalledTimes(1);
  });
});

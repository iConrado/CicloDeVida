import sinon from 'sinon';
import firebase from 'react-native-firebase';

import Storage from '../src/components/functions/Storage';

const mockItens = {};
const mockSet = async dado => {
  mockItens.dado = dado;
  return true;
};
const mockOnce = async () => {
  const resp = {
    val: () => mockItens.dado,
  };
  return new Promise(resolve => {
    resolve(resp);
  });
};
const mockRemove = async () => {
  delete mockItens.dado;
};

const stubGrav = sinon.stub(firebase, 'auth');
stubGrav.callsFake(() => ({ currentUser: { uid: 555 } }));

const stubRec = sinon.stub(firebase, 'database');
stubRec.onFirstCall().throws();
stubRec.onSecondCall().throws();
stubRec.onThirdCall().throws();
stubRec.callsFake(() => ({ ref: () => ({ set: mockSet, once: mockOnce, remove: mockRemove }) }));

describe('Storage', () => {
  const item = { nome: 'Teste', qtde: 20 };

  it('gravar - catch', async () => {
    const resp = await Storage.gravar('Teste', item);
    expect(resp).toBe(false);
  });

  it('recuperar - catch', async () => {
    const resp = await Storage.recuperar('Teste');
    expect(resp).toBe(false);
  });

  it('remover - catch', async () => {
    const resp = await Storage.remover('Teste');
    expect(resp).toBe(false);
  });

  it('gravar - item válido', async () => {
    const resp = await Storage.gravar('Teste', item);
    expect(resp).toBe(true);
  });

  it('gravar - item inválido', async () => {
    const resp = await Storage.gravar(55, item);
    expect(resp).toBe(false);
  });

  it('gravar - dado inválido', async () => {
    const resp = await Storage.gravar('Teste', 'item');
    expect(resp).toBe(false);
  });

  it('gravar - dado inválido', async () => {
    const resp = await Storage.gravar(item);
    expect(resp).toBe(false);
  });

  it('recuperar - item válido', async () => {
    const resp = await Storage.recuperar('Teste');
    expect(resp).toMatchObject(item);
  });

  it('recuperar - item inválido', async () => {
    const resp = await Storage.recuperar(55);
    expect(resp).toBe(false);
  });

  it('recuperar - item inválido', async () => {
    const resp = await Storage.recuperar();
    expect(resp).toBe(false);
  });

  it('remover - item válido', async () => {
    const resp = await Storage.remover('Teste');
    expect(resp).toBe(true);
  });

  it('remover - item inválido', async () => {
    const resp = await Storage.remover(55);
    expect(resp).toBe(false);
  });

  it('remover - item inválido', async () => {
    const resp = await Storage.remover();
    expect(resp).toBe(false);
  });
});

import 'react-native';

import verificaData from '../src/components/functions/verificaData';

describe('verifica datas String (dd/mm/aaaa) corretamente', () => {
  test('Data válida', () => {
    expect(verificaData('01/12/2014')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/01/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/02/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/03/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/04/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/05/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/06/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/07/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/08/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/09/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/10/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/11/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29/12/2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('29-10-1985')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('12-11-1930')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('18-02-2016')).toBeTruthy();
  });

  test('Data válida', () => {
    expect(verificaData('19/02/1959')).toBeTruthy();
  });

  test('Data inválida', () => {
    expect(verificaData('19-14-1959')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('00-00-0000')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('25/08/2200')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('13/02/1825')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('1/10/1995')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('08/25/2014')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('32/11/2014')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('32/12/2014')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('29/02/2014')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('')).toBeFalsy();
  });

  test('Data inválida', () => {
    expect(verificaData('SSASDASDSD')).toBeFalsy();
  });
});

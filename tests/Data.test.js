import 'react-native';

import Data from '../src/components/functions/Data';

describe('Converte as datas corretamente', () => {
  // dataToString
  test('Converte um objeto do tipo Date corretamente', () => {
    expect(Data.dataToString(new Date('January, 30, 2018'))).toBe('30/01/2018');
  });

  test('Converte um objeto do tipo Date corretamente', () => {
    expect(Data.dataToString(new Date('December, 9, 2018'))).toBe('09/12/2018');
  });

  test('Retorna falso para outros tipos', () => {
    expect(Data.dataToString('January, 30, 2018')).toBeFalsy();
  });

  // dataToStringAA

  test('Converte um objeto do tipo Date corretamente', () => {
    expect(Data.dataToStringAA(new Date('January, 30, 2018'))).toBe('30/01/18');
  });
  test('Converte um objeto do tipo Date corretamente', () => {
    expect(Data.dataToStringAA(new Date('December, 9, 2018'))).toBe('09/12/18');
  });

  test('Retorna falso para outros tipos', () => {
    expect(Data.dataToStringAA('January, 30, 2018')).toBeFalsy();
  });

  // stringToData

  test('Converte string corretamente', () => {
    const d = new Date('January, 30, 2018');
    expect(Data.stringToData('30/01/2018').toString()).toBe(d.toString());
  });

  test('Retorna falso para outros tipos', () => {
    expect(Data.stringToData(512)).toBeFalsy();
  });

  test('Retorna falso para outros tipos', () => {
    expect(Data.stringToData(false)).toBeFalsy();
  });

  test('Retorna falso para outros tipos', () => {
    expect(Data.stringToData()).toBeFalsy();
  });

});

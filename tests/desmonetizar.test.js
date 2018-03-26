import 'react-native';

import desmonetizar from '../src/components/functions/desmonetizar';

describe('desmonetizar corretamente', () => {
  test('string valida R$ 500', () => {
    expect(desmonetizar('R$ 500')).toBe(500);
  });

  test('string valida R$ 5.000,00', () => {
    expect(desmonetizar('R$ 5.000,00')).toBe(5000);
  });

  test('string valida 5.000.000,00', () => {
    expect(desmonetizar('5.000.000,00')).toBe(5000000);
  });

  test('numero valido 5000.40', () => {
    expect(desmonetizar(5000.40)).toBe(5000);
  });

  test('string invalida', () => {
    expect(desmonetizar('teste')).toBe(0);
  });
});

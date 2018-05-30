import 'react-native';

import monetizar from '../src/components/functions/monetizar';

describe('monetizar corretamente', () => {
  test('numero valido', () => {
    expect(monetizar(500)).toBe('R$ 500');
  });

  test('numero valido', () => {
    expect(monetizar(-106500)).toBe('R$ -106.500');
  });

  test('numero invalido', () => {
    expect(monetizar('ab')).toBe('R$ ');
  });

  test('numero invalido', () => {
    expect(monetizar(75.1)).toBe('R$ ');
  });
});

import 'react-native';
import renderer from 'react-test-renderer';

import monetizar from '../src/components/functions/monetizar';

describe('monetizar corretamente', () => {
  test('numero valido', () => {
    expect(monetizar(500)).toBe('R$ 500');
  });

  test('numero invalido', () => {
    expect(monetizar('ab')).toBe('R$ ');
  });

  test('numero invalido', () => {
    expect(monetizar(75.1)).toBe('R$ ');
  });
});

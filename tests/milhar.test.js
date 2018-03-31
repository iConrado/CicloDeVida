import 'react-native';
import renderer from 'react-test-renderer';

import milhar from '../src/components/functions/milhar';

describe('milhar corretamente', () => {
  test('numero valido', () => {
    expect(milhar(5000)).toBe('5.000');
  });

  test('numero valido', () => {
    expect(milhar('5000')).toBe('5.000');
  });

  test('numero invalido', () => {
    expect(milhar('aaa')).toBe('aaa');
  });

  test('numero invalido', () => {
    expect(milhar('')).toBe('');
  });
});
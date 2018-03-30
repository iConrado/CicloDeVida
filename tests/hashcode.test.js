import 'react-native';

import hashcode from '../src/components/functions/hashcode';

describe('Gera um hashcode corretamente', () => {
  const a = hashcode('String A');
  const b = hashcode('String B');
  const c = hashcode('String A');

  test('hashcode A deve ser diferente de B', () => {
    expect(a === b).toBeFalsy();
  });

  test('hashcode B deve ser diferente de C', () => {
    expect(b === c).toBeFalsy();
  });

  test('hashcode A deve ser igual a C', () => {
    expect(a === c).toBeTruthy();
  });
});

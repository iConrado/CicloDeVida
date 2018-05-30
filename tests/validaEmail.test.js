import 'react-native';

import validaEmail from '../src/components/functions/validaEmail';

describe('validaEmail corretamente', () => {
  test('Email válido email@provedor.com.br', () => {
    expect(validaEmail('email@provedor.com.br')).toBeTruthy();
  });

  test('Email válido email@provedor.com', () => {
    expect(validaEmail('email@provedor.com')).toBeTruthy();
  });

  test('Email válido a@a.com', () => {
    expect(validaEmail('a@a.com')).toBeTruthy();
  });

  test('Email válido email_composto@provedor.com', () => {
    expect(validaEmail('email_composto@provedor.com')).toBeTruthy();
  });

  test('Email válido email+tag@provedor.com', () => {
    expect(validaEmail('email+tag@provedor.com')).toBeTruthy();
  });

  test('Email válido {email}+!=tag@provedor.com', () => {
    expect(validaEmail('{email}+!=tag@provedor.com')).toBeTruthy();
  });

  test('Email inválido aasdasd!adsda.com', () => {
    expect(validaEmail('aasdasd!adsda.com')).toBeFalsy();
  });

  test('Email inválido 5014', () => {
    expect(validaEmail(5014)).toBeFalsy();
  });
});

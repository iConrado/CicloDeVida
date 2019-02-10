// Função para formatar máscaras de telefone celular

export const formatarTel = tel => {
  if (typeof tel === 'string') {
    // Remove tudo o que não é dígito
    // Coloca parênteses em volta dos dois primeiros dígitos
    // Coloca hífen entre o quarto e o quinto dígitos
    const str = tel
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
    return str;
  }
  return tel;
};

export const extrairTel = tel => {
  if (typeof tel === 'string') {
    const ret = tel.replace(/\D/g, '');

    return ret;
  }
  return tel;
};

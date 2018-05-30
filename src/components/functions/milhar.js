const milhar = numero => {
  // Transforma números inteiros em strings separadas pela milhar com o ponto(.)
  let num;
  let sinal = '';
  const str = [];

  if (numero < 0 || parseInt(numero, 10) < 0) {
    num = Math.abs(parseInt(numero, 10)).toString();
    sinal = '-';
  } else {
    num = numero.toString();
  }

  if (!num.length) {
    return '';
  }

  for (let i = Math.ceil(num.length / 3); i > 0; i -= 1) {
    if (Math.ceil(num.length / 3) > 1) {
      str[i] = `.${num.slice(-3)}`;
    } else {
      str[i] = num;
    }
    num = num.slice(num.length - num.length * 2, -3);
  }

  str.push(num);

  if (sinal === '-') {
    return sinal + str.join('');
  }
  return str.join('');
};

export default milhar;


const milhar = (numero) => {
  // Transforma números inteiros em strings separadas pela milhar com o ponto(.)
  let num = numero.toString();
  const str = [];
  
  if (!num.length) { return 0; }
  
  for (let i = Math.ceil(num.length / 3); i > 0; i--) {
    if (Math.ceil(num.length / 3) > 1) {
      str[i] = `.${num.slice(-3)}`;
    } else {
      str[i] = num;
    }
    num = num.slice(num.length - (num.length * 2), -3);
  }

  str.push(num);

  return str.join('');
};

export default milhar;

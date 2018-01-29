import milhar from './milhar';

const monetizar = (quantia) => {
  if (Number.isInteger(quantia)) {
    return `R$ ${milhar(quantia.toString())}`;
  }
  return 'R$ ';  
};

export default monetizar;

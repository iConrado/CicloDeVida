
const desmonetizar = (quantia) => {
  let filtro;
  let num;

  if (Number.isNaN(parseFloat(quantia))) {
    filtro = quantia.toString().replace(/\./g, '').replace(',', '.');
    num = parseFloat(filtro.substring(3, 32));
  } else {
    if (typeof quantia === 'string') {
      filtro = quantia.toString().replace(/\./g, '').replace(',', '.');
    } else {
      filtro = quantia;
    }
    num = parseInt(filtro, 10);
  }

  if (Number.isInteger(num)) {
    return num;
  } 
  return 0;
};

export default desmonetizar;

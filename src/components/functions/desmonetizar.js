
const desmonetizar = (quantia) => {
  const filtro = quantia.replace('.', '').replace(',', '');
  let num;
  if (Number.isNaN(parseFloat(filtro))) {
    num = parseInt(filtro.substring(3, 12), 10);
  } else {
    num = parseInt(filtro, 10);
  }

  if (Number.isInteger(num)) {
    return num;
  }
  return 0;
};

export default desmonetizar;

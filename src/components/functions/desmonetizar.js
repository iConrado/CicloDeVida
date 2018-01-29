
const desmonetizar = (quantia) => {
  const filtro = quantia.replace('.', '').replace(',', '').replace('-', '');
  const num = parseInt(filtro.substring(3, 12), 10);
  if (Number.isInteger(num)) {
    return num;
  }
  return 0;
};

export default desmonetizar;

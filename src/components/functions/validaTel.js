// Função para validar endereços de e-mail através de REGEX

const reg = /^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$/;

const validaTel = tel => {
  if (typeof tel === 'string') {
    if (tel.toString().match(reg)) {
      //eslint-disable-line
      return true;
    }
  }
  return false;
};

export default validaTel;

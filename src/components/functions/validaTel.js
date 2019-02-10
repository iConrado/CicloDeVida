// Função para validar endereços de e-mail através de REGEX

const reg = /^\([0-9]{2}\)[ ]{1}(([2-7]{1}[0-9]{3}-[0-9]{4})|(9[0-9]{4}-[0-9]{4}))$/;

const validaTel = tel => {
  if (typeof tel === 'string') {
    if (tel.toString().match(reg)) {
      return true;
    }
  }
  return false;
};

export default validaTel;

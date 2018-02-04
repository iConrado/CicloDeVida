// Função para validar endereços de e-mail através de REGEX

const validaEmail = (email) => {
  if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { //eslint-disable-line
    return true;
  }
  return false;
};

export default validaEmail;

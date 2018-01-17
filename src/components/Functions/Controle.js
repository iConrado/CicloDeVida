
const Controle = (objErro, funcao, argumento) => {
  try {
    const f = funcao(argumento);
    if (f !== true) {
      throw f;
    }
  } catch (erro) {
    objErro(erro.nome, erro.msg);
  }
};

export default Controle;


const Controle = (retErro, obj, funcao, ...args) => {
  try {
    funcao.call(obj, ...args);
    //console.log('Controle - executou com sucesso.');
    return true;
  } catch (e) {
    retErro(e, 0);
    /* Adicionar função de log para os erros */
    console.log('Controle - função executou com erro.');
    return false;
  }
};

export default Controle;

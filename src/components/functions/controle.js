const controle = (retErro, obj, funcao, ...args) => {
  try {
    funcao.call(obj, ...args);
    // console.log('Controle - executou com sucesso.');
    return true;
  } catch (e) {
    retErro(e);
    /* Adicionar função de log para os erros */
    // console.log('Controle - função executou com erro:', e);
    return false;
  }
};

export default controle;

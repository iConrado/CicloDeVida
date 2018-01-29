
const Controle = (retErro, funcao, argumento) => {
  try {
    funcao(argumento);
    console.log('Chamou e retornou com sucesso a função');
  } catch (e) {
    retErro(e, 0);
    console.log('Retornou com erro da função');
  }
};

export default Controle;

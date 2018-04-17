import controle from '../src/components/functions/controle';
import Erro from '../src/components/functions/Erro';
import Ciclo from '../src/components/functions/Ciclo';

const C = new Ciclo();

const retornoErro = (e) => {
  console.log(e);
};

describe('Testes da função controle', () => {
  it('Teste com retorno válido', () => {
    const retorno = controle(retornoErro, C, C.setSalLiq, 8550);
    expect(retorno).toBe(true);
  });

  it('Teste com retorno inválido', () => {
    const retorno = controle(retornoErro, C, C.setSalLiq, 'ABC');
    expect(retorno).toBe(false);
  });
});

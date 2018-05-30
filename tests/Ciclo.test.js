import 'react-native';

import Ciclo from '../src/components/functions/Ciclo';
// import Erro from '../src/components/functions/Erro';

describe('Classe de negócio Ciclo', () => {
  const c = new Ciclo();

  // ************************************************
  // *            GETTERS AND SETTERS               *
  // ************************************************

  // Email
  test('Get email com retorno vazio', () => {
    expect(c.getEmail()).toBeFalsy();
  });

  test('Email válido', () => {
    expect(c.setEmail('teste@teste.com.br')).toBeTruthy();
  });

  test('Email inválido', () => {
    function func() {
      c.setEmail('');
    }
    expect(func).toThrowError();
  });

  test('Get email com retorno preenchido', () => {
    expect(c.getEmail()).toBe('teste@teste.com.br');
  });

  test('Get nome com retorno vazio', () => {
    expect(c.getNome()).toBeFalsy();
  });

  // Nome
  test('Nome válido', () => {
    expect(c.setNome('Fernando Guimaraes')).toBeTruthy();
  });

  test('Nome inválido', () => {
    function func() {
      c.setNome('');
    }
    expect(func).toThrowError();
  });

  test('Nome inválido', () => {
    function func() {
      c.setNome('ASD');
    }
    expect(func).toThrowError();
  });

  test('Nome inválido', () => {
    function func() {
      c.setNome('5656548!21');
    }
    expect(func).toThrowError();
  });

  test('Get nome com retorno preenchido', () => {
    expect(c.getNome()).toBe('Fernando Guimaraes');
  });

  // Nasc
  test('Get Nasc com retorno vazio', () => {
    expect(c.getNasc()).toBeFalsy();
  });

  test('Data Nasc válida', () => {
    expect(c.setNasc('01/02/1990')).toBeTruthy();
  });

  test('Data Nasc inválida', () => {
    function func() {
      c.setNasc('');
    }
    expect(func).toThrowError();
  });
  test('Data Nasc inválida', () => {
    function func() {
      c.setNasc();
    }
    expect(func).toThrowError();
  });

  test('Get Nasc com retorno preenchido', () => {
    expect(c.getNasc()).toBe('01/02/1990');
  });

  // EstCivil
  test('Get EstCivil com retorno vazio', () => {
    expect(c.getEstCivil()).toBeFalsy();
  });

  test('EstCivil válido', () => {
    expect(c.setEstCivil(2)).toBeTruthy();
  });

  test('EstCivil inválido', () => {
    function func() {
      c.setEstCivil(0);
    }
    expect(func).toThrowError();
  });

  test('EstCivil inválido', () => {
    function func() {
      c.setEstCivil(10);
    }
    expect(func).toThrowError();
  });

  test('Get EstCivil com retorno preenchido', () => {
    expect(c.getEstCivil()).toBe(2);
  });

  // Filhos
  test('Get Filhos com retorno vazio', () => {
    expect(c.getFilhos()).toBeFalsy();
  });

  test('Filhos válido', () => {
    expect(c.setFilhos(2)).toBeTruthy();
  });

  test('Filhos inválido', () => {
    function func() {
      c.setFilhos(-1);
    }
    expect(func).toThrowError();
  });

  test('Filhos inválido', () => {
    function func() {
      c.setFilhos(12);
    }
    expect(func).toThrowError();
  });

  test('Filhos inválido', () => {
    function func() {
      c.setFilhos('asdas');
    }
    expect(func).toThrowError();
  });

  test('Get Filhos com retorno preenchido', () => {
    expect(c.getFilhos()).toBe(2);
  });

  // SalLiq
  test('Get SalLiq com retorno vazio', () => {
    expect(c.getSalLiq()).toBeFalsy();
  });

  test('SalLiq válido', () => {
    expect(c.setSalLiq(8550)).toBeTruthy();
  });

  test('SalLiq inválido', () => {
    function func() {
      c.setSalLiq(-1);
    }
    expect(func).toThrowError();
  });

  test('SalLiq inválido', () => {
    function func() {
      c.setSalLiq(12.5);
    }
    expect(func).toThrowError();
  });

  test('SalLiq inválido', () => {
    function func() {
      c.setSalLiq();
    }
    expect(func).toThrowError();
  });

  test('Get SalLiq com retorno preenchido', () => {
    expect(c.getSalLiq()).toBe(8550);
  });

  // IniCarreira
  test('Get IniCarreira com retorno vazio', () => {
    expect(c.getIniCarreira()).toBeFalsy();
  });

  test('IniCarreira válido', () => {
    expect(c.setIniCarreira('01/04/2000')).toBeTruthy();
  });

  test('IniCarreira inválido', () => {
    function func() {
      c.setIniCarreira('');
    }
    expect(func).toThrowError();
  });

  test('IniCarreira inválido', () => {
    function func() {
      c.setIniCarreira();
    }
    expect(func).toThrowError();
  });

  test('Get IniCarreira com retorno preenchido', () => {
    expect(c.getIniCarreira()).toBe('01/04/2000');
  });

  // Invest
  test('Get Invest com retorno vazio', () => {
    expect(c.getInvest()).toBeFalsy();
  });

  test('Invest válido', () => {
    expect(c.setInvest(12000)).toBeTruthy();
  });

  test('Invest inválido', () => {
    function func() {
      c.setInvest('');
    }
    expect(func).toThrowError();
  });

  test('Invest inválido', () => {
    function func() {
      c.setInvest();
    }
    expect(func).toThrowError();
  });

  test('Invest inválido', () => {
    function func() {
      c.setInvest(-12);
    }
    expect(func).toThrowError();
  });

  test('Invest inválido', () => {
    function func() {
      c.setInvest('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Invest com retorno preenchido', () => {
    expect(c.getInvest()).toBe(12000);
  });

  // Imoveis
  test('Get Imoveis com retorno vazio', () => {
    expect(c.getImoveis()).toBeFalsy();
  });

  test('Imoveis válido', () => {
    expect(c.setImoveis(1450000)).toBeTruthy();
  });

  test('Imoveis inválido', () => {
    function func() {
      c.setImoveis('');
    }
    expect(func).toThrowError();
  });

  test('Imoveis inválido', () => {
    function func() {
      c.setImoveis();
    }
    expect(func).toThrowError();
  });

  test('Imoveis inválido', () => {
    function func() {
      c.setImoveis(-12);
    }
    expect(func).toThrowError();
  });

  test('Imoveis inválido', () => {
    function func() {
      c.setImoveis('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Imoveis com retorno preenchido', () => {
    expect(c.getImoveis()).toBe(1450000);
  });

  // Veiculos
  test('Get Veiculos com retorno vazio', () => {
    expect(c.getVeiculos()).toBeFalsy();
  });

  test('Veiculos válido', () => {
    expect(c.setVeiculos(212000)).toBeTruthy();
  });

  test('Veiculos inválido', () => {
    function func() {
      c.setVeiculos('');
    }
    expect(func).toThrowError();
  });

  test('Veiculos inválido', () => {
    function func() {
      c.setVeiculos();
    }
    expect(func).toThrowError();
  });

  test('Veiculos inválido', () => {
    function func() {
      c.setVeiculos(-12);
    }
    expect(func).toThrowError();
  });

  test('Veiculos inválido', () => {
    function func() {
      c.setVeiculos('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Veiculos com retorno preenchido', () => {
    expect(c.getVeiculos()).toBe(212000);
  });

  // Gasto
  test('Get Gasto com retorno vazio', () => {
    expect(c.getGasto()).toBeFalsy();
  });

  test('Gasto válido', () => {
    expect(c.setGasto(3550)).toBeTruthy();
  });

  test('Gasto inválido', () => {
    function func() {
      c.setGasto('');
    }
    expect(func).toThrowError();
  });

  test('Gasto inválido', () => {
    function func() {
      c.setGasto();
    }
    expect(func).toThrowError();
  });

  test('Gasto inválido', () => {
    function func() {
      c.setGasto(-12);
    }
    expect(func).toThrowError();
  });

  test('Gasto inválido', () => {
    function func() {
      c.setGasto('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Gasto com retorno preenchido', () => {
    expect(c.getGasto()).toBe(3550);
  });

  // Reserva
  test('Get Reserva com retorno vazio', () => {
    expect(c.getReserva()).toBeFalsy();
  });

  test('Reserva válido', () => {
    expect(c.setReserva(868)).toBeTruthy();
  });

  test('Reserva inválido', () => {
    function func() {
      c.setReserva('');
    }
    expect(func).toThrowError();
  });

  test('Reserva inválido', () => {
    function func() {
      c.setReserva();
    }
    expect(func).toThrowError();
  });

  test('Reserva inválido', () => {
    function func() {
      c.setReserva(-12);
    }
    expect(func).toThrowError();
  });

  test('Reserva inválido', () => {
    function func() {
      c.setReserva('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Reserva com retorno preenchido', () => {
    expect(c.getReserva()).toBe(868);
  });

  // Disponib
  test('Get Disponib com retorno vazio', () => {
    expect(c.getDisponib()).toBeFalsy();
  });

  test('Disponib válido', () => {
    expect(c.setDisponib(950)).toBeTruthy();
  });

  test('Disponib inválido', () => {
    function func() {
      c.setDisponib('');
    }
    expect(func).toThrowError();
  });

  test('Disponib inválido', () => {
    function func() {
      c.setDisponib();
    }
    expect(func).toThrowError();
  });

  test('Disponib inválido', () => {
    function func() {
      c.setDisponib(-12);
    }
    expect(func).toThrowError();
  });

  test('Disponib inválido', () => {
    function func() {
      c.setDisponib('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Disponib com retorno preenchido', () => {
    expect(c.getDisponib()).toBe(950);
  });

  // ReservaPrev
  test('Get ReservaPrev com retorno vazio', () => {
    expect(c.getReservaPrev()).toBeFalsy();
  });

  test('ReservaPrev válido', () => {
    expect(c.setReservaPrev(18000)).toBeTruthy();
  });

  test('ReservaPrev inválido', () => {
    function func() {
      c.setReservaPrev('');
    }
    expect(func).toThrowError();
  });

  test('ReservaPrev inválido', () => {
    function func() {
      c.setReservaPrev();
    }
    expect(func).toThrowError();
  });

  test('ReservaPrev inválido', () => {
    function func() {
      c.setReservaPrev(-12);
    }
    expect(func).toThrowError();
  });

  test('ReservaPrev inválido', () => {
    function func() {
      c.setReservaPrev('12550');
    }
    expect(func).toThrowError();
  });

  test('Get ReservaPrev com retorno preenchido', () => {
    expect(c.getReservaPrev()).toBe(18000);
  });

  // IdadeAposent
  test('Get IdadeAposent com retorno vazio', () => {
    expect(c.getIdadeAposent()).toBeFalsy();
  });

  test('IdadeAposent válido', () => {
    expect(c.setIdadeAposent(55)).toBeTruthy();
  });

  test('IdadeAposent inválido', () => {
    function func() {
      c.setIdadeAposent('');
    }
    expect(func).toThrowError();
  });

  test('IdadeAposent inválido', () => {
    function func() {
      c.setIdadeAposent();
    }
    expect(func).toThrowError();
  });

  test('IdadeAposent inválido', () => {
    function func() {
      c.setIdadeAposent(-12);
    }
    expect(func).toThrowError();
  });

  test('IdadeAposent inválido', () => {
    function func() {
      c.setIdadeAposent('12550');
    }
    expect(func).toThrowError();
  });

  test('IdadeAposent inválido - idadeAposent menor que idade atual', () => {
    function func() {
      c.setIdadeAposent(25);
    }
    expect(func).toThrowError();
  });

  test('Get IdadeAposent com retorno preenchido', () => {
    expect(c.getIdadeAposent()).toBe(55);
  });

  // Rentab
  test('Get Rentab com retorno vazio', () => {
    expect(c.getRentab()).toBeFalsy();
  });

  test('Rentab válido', () => {
    expect(c.setRentab(0.12)).toBeTruthy();
  });

  test('Rentab inválido', () => {
    function func() {
      c.setRentab('');
    }
    expect(func).toThrowError();
  });

  test('Rentab inválido', () => {
    function func() {
      c.setRentab();
    }
    expect(func).toThrowError();
  });

  test('Rentab inválido', () => {
    function func() {
      c.setRentab(-12);
    }
    expect(func).toThrowError();
  });

  test('Rentab inválido', () => {
    function func() {
      c.setRentab('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Rentab com retorno preenchido', () => {
    expect(c.getRentab()).toBe(0.12);
  });

  // Saude
  test('Get Saude com retorno vazio', () => {
    expect(c.getSaude()).toBeFalsy();
  });

  test('Saude válido', () => {
    expect(c.setSaude(265)).toBeTruthy();
  });

  test('Saude inválido', () => {
    function func() {
      c.setSaude('');
    }
    expect(func).toThrowError();
  });

  test('Saude inválido', () => {
    function func() {
      c.setSaude();
    }
    expect(func).toThrowError();
  });

  test('Saude inválido', () => {
    function func() {
      c.setSaude(-12);
    }
    expect(func).toThrowError();
  });

  test('Saude inválido', () => {
    function func() {
      c.setSaude('12550');
    }
    expect(func).toThrowError();
  });

  test('Get Saude com retorno preenchido', () => {
    expect(c.getSaude()).toBe(265);
  });

  // ImovelInvestPrazo
  test('Get ImovelInvestPrazo com retorno vazio', () => {
    expect(c.getImovelInvestPrazo()).toBeFalsy();
  });

  test('ImovelInvestPrazo válido', () => {
    expect(c.setImovelInvestPrazo(180)).toBeTruthy();
  });

  test('ImovelInvestPrazo inválido', () => {
    function func() {
      c.setImovelInvestPrazo('');
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPrazo inválido', () => {
    function func() {
      c.setImovelInvestPrazo();
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPrazo inválido', () => {
    function func() {
      c.setImovelInvestPrazo(-12);
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPrazo inválido', () => {
    function func() {
      c.setImovelInvestPrazo('12550');
    }
    expect(func).toThrowError();
  });

  test('Get ImovelInvestPrazo com retorno preenchido', () => {
    expect(c.getImovelInvestPrazo()).toBe(180);
  });

  // ImovelInvestPerc
  test('Get ImovelInvestPerc com retorno vazio', () => {
    expect(c.getImovelInvestPerc()).toBeFalsy();
  });

  test('ImovelInvestPerc válido', () => {
    expect(c.setImovelInvestPerc(0.1)).toBeTruthy();
  });

  test('ImovelInvestPerc inválido', () => {
    function func() {
      c.setImovelInvestPerc('');
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPerc inválido', () => {
    function func() {
      c.setImovelInvestPerc();
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPerc inválido', () => {
    function func() {
      c.setImovelInvestPerc(-12);
    }
    expect(func).toThrowError();
  });

  test('ImovelInvestPerc inválido', () => {
    function func() {
      c.setImovelInvestPerc('12550');
    }
    expect(func).toThrowError();
  });

  test('Get ImovelInvestPerc com retorno preenchido', () => {
    expect(c.getImovelInvestPerc()).toBe(0.1);
  });

  // AutoInvestPrazo
  test('Get AutoInvestPrazo com retorno vazio', () => {
    expect(c.getAutoInvestPrazo()).toBeFalsy();
  });

  test('AutoInvestPrazo válido', () => {
    expect(c.setAutoInvestPrazo(72)).toBeTruthy();
  });

  test('AutoInvestPrazo inválido', () => {
    function func() {
      c.setAutoInvestPrazo('');
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPrazo inválido', () => {
    function func() {
      c.setAutoInvestPrazo();
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPrazo inválido', () => {
    function func() {
      c.setAutoInvestPrazo(-12);
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPrazo inválido', () => {
    function func() {
      c.setAutoInvestPrazo('12550');
    }
    expect(func).toThrowError();
  });

  test('Get AutoInvestPrazo com retorno preenchido', () => {
    expect(c.getAutoInvestPrazo()).toBe(72);
  });

  // AutoInvestPerc
  test('Get AutoInvestPerc com retorno vazio', () => {
    expect(c.getAutoInvestPerc()).toBeFalsy();
  });

  test('AutoInvestPerc válido', () => {
    expect(c.setAutoInvestPerc(0.1)).toBeTruthy();
  });

  test('AutoInvestPerc inválido', () => {
    function func() {
      c.setAutoInvestPerc('');
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPerc inválido', () => {
    function func() {
      c.setAutoInvestPerc();
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPerc inválido', () => {
    function func() {
      c.setAutoInvestPerc(-12);
    }
    expect(func).toThrowError();
  });

  test('AutoInvestPerc inválido', () => {
    function func() {
      c.setAutoInvestPerc('12550');
    }
    expect(func).toThrowError();
  });

  test('Get AutoInvestPerc com retorno preenchido', () => {
    expect(c.getAutoInvestPerc()).toBe(0.1);
  });

  // ************************************************
  // *                  METODOS                     *
  // ************************************************

  // recuperar
  test.skip('recuperar', () => {
    expect(c.recuperar('teste@teste.com.br')).toBeTruthy();
  });

  // salvar
  test.skip('salvar', () => {
    expect(c.salvar()).toBeTruthy();
  });

  // tempoDecorridoAnos (teste válido para execução entre 05/03/2018 a 04/03/2019)
  test('tempoDecorridoAnos retorno válido', () => {
    expect(Ciclo.tempoDecorridoAnos('05/03/2017')).toBe(1);
  });

  test('tempoDecorridoAnos retorno válido', () => {
    expect(Ciclo.tempoDecorridoAnos('05/11/2017')).toBe(0);
  });

  test('tempoDecorridoAnos retorno inválido', () => {
    expect(Ciclo.tempoDecorridoAnos()).toBeFalsy();
  });

  test('tempoDecorridoAnos retorno inválido', () => {
    expect(Ciclo.tempoDecorridoAnos(512)).toBeFalsy();
  });

  // comprometimentoAtual
  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('resultado', 6250)).toBe(180);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('consumo', 5500)).toBe(151);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('seguranca', 4680)).toBe(138);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('aposentadoria', 3300)).toBe(90);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('reserva', 2500)).toBe(29);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('patrimonio', 1300)).toBe(15);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('home', 855)).toBe(10);
  });

  test('comprometimentoAtual retorno válido', () => {
    expect(c.comprometimentoAtual('home', 0)).toBe(0);
  });

  test('comprometimentoAtual retorno inválido', () => {
    expect(c.comprometimentoAtual('nao_existente', 550)).toBeFalsy();
  });

  test('comprometimentoAtual retorno inválido', () => {
    expect(c.comprometimentoAtual('nao_existe')).toBeFalsy();
  });

  test('comprometimentoAtual retorno inválido', () => {
    expect(c.comprometimentoAtual(512, 512)).toBeFalsy();
  });

  test('comprometimentoAtual retorno inválido', () => {
    expect(c.comprometimentoAtual()).toBeFalsy();
  });

  // idadeAtual (teste válido para execução entre 01/02/2018 a 31/01/2019)
  test('idadeAtual retorno válido', () => {
    expect(c.idadeAtual()).toBe(28);
  });

  // faixaEtaria (teste válido para execução entre 01/02/2018 a 31/01/2019)
  test('faixaEtaria retorno válido', () => {
    const tmp = c.getNasc();
    expect(c.faixaEtaria()).toBe('Até 30 anos');
    c.setNasc('29/10/1985');
    expect(c.faixaEtaria()).toBe('Acima de 30 anos');
    c.setNasc('14/07/1970');
    expect(c.faixaEtaria()).toBe('Acima de 45 anos');
    c.setNasc(tmp); // retorna para o valor definido inicialmente
  });

  test('faixaEtaria retorno inválido', () => {
    const tmp = c.getNasc();
    c.Nasc = 0;
    expect(c.faixaEtaria()).toBe('Idade inválida ou não definida');
    c.setNasc(tmp); // retorna para o valor definido inicialmente
  });

  // patrimonioEsperado
  test('patrimonioEsperado retorno válido', () => {
    expect(c.patrimonioEsperado()).toBe(179550);
  });

  test('patrimonioEsperado retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.patrimonioEsperado()).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // comprometimentoGasto
  test('comprometimentoGasto retorno válido', () => {
    expect(c.comprometimentoGasto(855)).toBe(0.1);
  });

  test('comprometimentoGasto retorno válido', () => {
    expect(c.comprometimentoGasto(0)).toBe(0);
  });

  test('comprometimentoGasto retorno inválido', () => {
    expect(c.comprometimentoGasto(-550)).toBeFalsy();
  });

  test('comprometimentoGasto retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.comprometimentoGasto()).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // sugestReserv
  test('sugestReserv retorno válido', () => {
    expect(c.sugestReserv()).toBe(0.1);
  });

  // sugestaoLimSeg
  test('sugestaoLimSeg retorno válido', () => {
    expect(c.sugestaoLimSeg()).toBe(2565);
  });

  test('sugestaoLimSeg retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.sugestaoLimSeg()).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // coberturaVida
  test('coberturaVida retorno válido', () => {
    expect(c.coberturaVida()).toBe(205200);
  });

  test('coberturaVida retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.coberturaVida()).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // seguroVida
  test('seguroVida retorno válido', () => {
    expect(c.seguroVida()).toBe(328);
  });

  test('seguroVida retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.seguroVida()).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // seguroImoveis
  test('seguroImoveis retorno válido', () => {
    expect(c.seguroImoveis()).toBe(435);
  });

  test('seguroImoveis retorno inválido', () => {
    const tmp = c.getImoveis();
    c.setImoveis(0);
    expect(c.seguroImoveis()).toBeFalsy();
    c.setImoveis(tmp); // retorna para o valor definido inicialmente
  });

  // seguroAuto
  test('seguroAuto retorno válido', () => {
    expect(c.seguroAuto()).toBe(1060);
  });

  test('seguroAuto retorno inválido', () => {
    const tmp = c.getVeiculos();
    c.setVeiculos(0);
    expect(c.seguroAuto()).toBeFalsy();
    c.setVeiculos(tmp); // retorna para o valor definido inicialmente
  });

  // patrimonioProt
  test('patrimonioProt retorno válido', () => {
    expect(c.patrimonioProt(328)).toBe(1867528);
  });

  test('patrimonioProt retorno válido', () => {
    expect(c.patrimonioProt(0)).toBe(1867200);
  });

  test('patrimonioProt retorno inválido', () => {
    expect(c.patrimonioProt()).toBeFalsy();
  });

  test('patrimonioProt retorno inválido', () => {
    expect(c.patrimonioProt('asd')).toBeFalsy();
  });

  test('patrimonioProt retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.patrimonioProt(328)).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // montante
  test('montante retorno válido', () => {
    const mont = Ciclo.montante(0, 85, 24, 0.6434);
    expect(mont).toBe(2212);
  });

  test('montante retorno inválido', () => {
    expect(Ciclo.montante(0)).toBeFalsy();
  });

  test('montante retorno inválido', () => {
    expect(Ciclo.montante(0, 0, 0, 0)).toBeFalsy();
  });

  test('montante retorno inválido', () => {
    expect(Ciclo.montante('asd')).toBeFalsy();
  });

  // taxaMensal
  test('taxaMensal retorno válido', () => {
    expect(Ciclo.taxaMensal(8)).toBe(0.643403011000343);
  });

  test('taxaMensal retorno inválido', () => {
    expect(Ciclo.taxaMensal(0)).toBeFalsy();
  });

  test('taxaMensal retorno inválido', () => {
    expect(Ciclo.taxaMensal('asd')).toBeFalsy();
  });

  // planoImovel
  test('planoImovel retorno válido', () => {
    expect(c.planoImovel(0.1)).toBe(855);
  });

  test('planoImovel retorno inválido', () => {
    expect(c.planoImovel(12)).toBeFalsy();
  });

  test('planoImovel retorno inválido', () => {
    expect(c.planoImovel('asd')).toBeFalsy();
  });

  test('planoImovel retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.planoImovel(0.1)).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // planoAuto
  test('planoAuto retorno válido', () => {
    expect(c.planoAuto(0.1)).toBe(855);
  });

  test('planoAuto retorno inválido', () => {
    expect(c.planoAuto(12)).toBeFalsy();
  });

  test('planoAuto retorno inválido', () => {
    expect(c.planoAuto('asd')).toBeFalsy();
  });

  test('planoAuto retorno inválido', () => {
    const tmp = c.getSalLiq();
    c.SalLiq = 0;
    expect(c.planoAuto(0.1)).toBeFalsy();
    c.setSalLiq(tmp); // retorna para o valor definido inicialmente
  });

  // imovelInvest
  test('imovelInvest retorno válido', () => {
    expect(c.imovelInvest(15, 0.1)).toBe(155300);
  });

  test('imovelInvest retorno inválido', () => {
    expect(c.imovelInvest(-15, 0.1)).toBeFalsy();
  });

  test('imovelInvest retorno inválido', () => {
    expect(c.imovelInvest(0, 0.1)).toBeFalsy();
  });

  test('imovelInvest retorno inválido', () => {
    expect(c.imovelInvest('asd')).toBeFalsy();
  });

  // autoInvest
  test('autoInvest retorno válido', () => {
    expect(c.autoInvest(7, 0.1)).toBe(72125);
  });

  test('autoInvest retorno inválido', () => {
    expect(c.autoInvest(-15, 0.1)).toBeFalsy();
  });

  test('autoInvest retorno inválido', () => {
    expect(c.autoInvest(0, 0.1)).toBeFalsy();
  });

  test('autoInvest retorno inválido', () => {
    expect(c.autoInvest('asd')).toBeFalsy();
  });

  // resultadoGrafico
  test.skip('resultadoGrafico retorno válido', () => {
    expect(c.resultadoGrafico(7)).toBe(71820);
  });

  // resultadoAnalise
  test.skip('resultadoAnalise retorno válido', () => {
    expect(c.resultadoAnalise(7)).toBe(71820);
  });
});

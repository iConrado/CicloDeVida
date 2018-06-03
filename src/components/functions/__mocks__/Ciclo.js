// *************************************************************************************
// * CLASSE CICLO PARA O ARMAZENAMENTO DE INFORMAÇÕES E REALIZAÇÃO DOS CÁLCULOS DO APP *
// *************************************************************************************
// CARACTERÍSTICAS ESPECIAIS
// Somente deverá haver apenas um objeto instanciado por sessão do app, entretanto, po-
// dem ser gravados em asyncStorage ou outro banco de dados para recuperação futura.
//
// ATRIBUTOS
//
// - Básicas
// Timestamp    = Data/Hora da gravação
// Email        = PK - e-mail do usuário para gravação/recuperação da consultoria
// Nome         = Nome do usuário
// Nasc         = Data de nascimento
// EstCivil     = Estado Civil
//                Domínio (1 - Solteiro | 2 - Casado/União Est. | 3 - Divorciado |
//                         4 - Viuvo | 5 - Separado)
// Filhos       = Quantidade de filhos
// SalLiq       = Salário líquido atual em R$
// IniCarreira  = Data de início da carreira
//
// - Patrimônio
// Invest       = Investimentos atuais (aplicações/poupança/etc...)
// Imoveis      = Imóveis próprios ou financiados
// Veiculos     = Veículos próprios ou financiados
//
// - Reserva
// Gasto        = Gasto mensal estimado
// Reserva      = Sugestão de reserva
//
// - Aposentadoria
// Disponib     = Disponibilidade mensal para previdência privada
// ReservaPrev  = Reserva existente em plano previdenciário privado
// IdadeAposent = Idade desejada para aposentadoria (em anos)
// Rentab       = Taxa de Rentabilidade (% a.a.)
//
// - Segurança
// Saude        = Gasto mensal com convênios de saúde/odontolôgico/funerário
// SegVida      = Gasto mensal com seguro de vida individual ou coletivo
// SegImov      = Gasto mensal com seguro residencial
// SegAuto      = Gasto mensal com seguro de automóveis
//
// - Consumo
// ImovelInvestPrazo = Prazo para poupar e investir na compra de um imóvel como investimento
// ImovelInvesPerc   = Percentual da renda dedicado para o investimento em imóvel
// AutoInvestPrazo   = Prazo para poupar e investir na compra ou troca de um novo veículo
// AutoInvestPerc    = Percentual da renda dedicado para a compra de um novo veículo
//
// - Resultado
// nihil
//
//
// MÉTODOS
//
// - constructor (nihil)
//       Inicializa a instância da classe com o app, certificando que não haverá mais
//       de uma instância por sessão.
//
// - recuperar (email)
//       Recupera uma consultoria através de um endereço de e-mail.
//       Limpa a instância e refaz todos os campos de acordo com o obtido no objeto
//       armazenado.
//
// - salvar (nihil)
//       Armazena a consultoria para que possa ser recuperada posteriormente.
//       Deve permitir salvar a consultoria a qualquer momento, independente da
//       quantidade de informações registradas.
//
// - comprometimentoAtual (tela)
//       Retorna o comprometimento da renda baseado no estágio da tela em que o
//       usuário se encontra. Deve retornar cálculos parciais respectivos.
//
// - idadeAtual (nihil)
//       Retorna a idade atual do usuário (em anos completos).
//
// - faixaEtaria (nihil)
//       Retorna string com a faixa etária atual do usuário.
//
// - patrimonioEsperado (nihil)
//       Retorna o valor de patrimônio referência de acordo com a idade e renda.
//
// - comprometimentoGasto (Gasto)
//       Retorna o percentual de comprometimento da renda em relação ao gasto mensal
//       informado.
//
// - sugestaoReserva (nihil)
//       Retorna a sugestão de reserva para aposentadoria de acordo com a idade e renda
//       do usuário.
//
// - sugestaoLimSeg (nihil)
//       Retorna sugestão de limite mensal para aplicação em seguridade.
//
// - seguroVida (nihil)
//       Retorna o valor alvo de gastos mensais em relação a seguro de vida com cobertura
//       de 24 salários brutos.
//
// - seguroImoveis (nihil)
//       Retorna o valor alvo de gastos mensais em relação a seguro de imoveis com cobertura
//       do patrimonio informado.
//
// - seguroAuto (nihil)
//       Retorna o valor alvo de gastos mensais em relação a seguro auto com cobertura
//       do patriomônio informado.
//
// - patrimonioProt (nihil)
//       Retorna o valor total do patrimônio protegido de acordo com as coberturas
//       registradas em seguridade.
//
// - montante(vp, parcela, prazo, taxaMM)
//       Retorna o valor de investimentos periódicos após o prazo determinado
//       vp (Valor Presente), parcela (depósito mensal),
//       prazo (em meses), taxaMM (XX% ao mês)
//
// - taxaMensal(taxaAnual)
//       Retorna o valor da taxa mensal a partir do valor da taxa anualizada.
//
// - planoImovel (nihil)
//       Retorna o valor da parcela sugerida para investimento em imóvel.
//
// - planoAuto (nihil)
//       Retorna o valor da parcela sugerida para investimento em automóvel.
//
// - imovelInvest (nihil)
//       Retorna o valor de imóvel para investimento de acordo com um prazo pré-
//       estabelecido.
//
// - autoInvest (nihil)
//       Retorna o valor de automóvel para compra ou troca de acordo com um prazo pré-
//       estabelecido.
//
// - resultadoGrafico (nihil)
//       Retorna objeto JSON com os valor em cadas área para montagem do gráfico.
//
// - resultadoAnalise (nihil)
//       Retorna o tipo de resultado de acordo com a análise do ciclo de vida do
//       usuário, caso saldo positivo ou negativo.
//

import moment from 'moment';

import Storage from '../Storage';
import hashCode from '../hashcode';
import Erro from '../Erro';

export default class Ciclo {
  constructor() {
    // Mecanismo Singleton para garantir uma única instância da classe para a sessão do app
    if (!Ciclo.instance) {
      Ciclo.instance = this;
    }
    const d = new Date();
    this.id = hashCode(d.getTime().toString());
    return Ciclo.instance;
  }

  async recuperar() {
    console.log('Usou o mock');
    return true;
  }

  async salvar() {
    return true;
  }

  static tempoDecorridoAnos(data) {
    moment.updateLocale('en', {
      relativeTime: {
        future: '',
        past: '',
        s: '',
        ss: '',
        m: '',
        mm: '',
        h: '',
        hh: '',
        d: '',
        dd: '',
        M: '',
        MM: '',
        y: '1',
        yy: '%d',
      },
    });

    const tempoDecorridoAA = moment(data, 'DD/MM/YYYY').fromNow(true);

    if (Number.isInteger(parseInt(tempoDecorridoAA, 10))) {
      return parseInt(tempoDecorridoAA, 10);
    }

    return 0;
  }

  comprometimentoAtual(tela, valorAdd) {
    // calcula o comprometimento com os atributos da tela imediatamente anterior
    // o valor da tela atual deve ser repassado na assinatura do método via valorAdd
    let valor = 0;
    let compr = 0;

    // switch implementado com base na ordem das telas. caso haja alteração, refatorar
    if (typeof tela === 'string') {
      switch (tela.toLowerCase()) {
        case 'resultado':
          valor += this.getSalLiq() * 0.1;
          valor += this.getSalLiq() * 0.1;

        case 'consumo': //eslint-disable-line
          valor += this.getSaude();

        case 'seguranca': //eslint-disable-line
          valor += this.getDisponib();

          valor += this.seguroVida();
          valor += this.seguroImoveis();
          valor += this.seguroAuto();

        case 'aposentadoria': //eslint-disable-line
          valor += this.getGasto();
          valor += this.getReserva();

        case 'reserva': //eslint-disable-line
        // sem calculos a realizar

        case 'patrimonio': //eslint-disable-line
        // sem calculos a realizar

        case 'home': //eslint-disable-line
          // sem calculos a realizar
          break;
        default:
          return 0;
      }
      compr += this.comprometimentoGasto(valor + valorAdd) * 100;
      return parseInt(compr, 10);
    }
    return 0;
  }

  idadeAtual() {
    return Ciclo.tempoDecorridoAnos(this.getNasc());
  }

  faixaEtaria() {
    if (this.idadeAtual() > 0 && this.idadeAtual() <= 30) {
      this.SugestReserv = 0.1;
      return 'Até 30 anos';
    }

    if (this.idadeAtual() > 30 && this.idadeAtual() <= 45) {
      this.SugestReserv = 0.2;
      return 'Acima de 30 anos';
    }

    if (this.idadeAtual() > 45) {
      this.SugestReserv = 0.3;
      return 'Acima de 45 anos';
    }

    this.SugestReserv = 0;
    return 'Idade inválida ou não definida';
  }

  patrimonioEsperado() {
    const tempoTrab = Ciclo.tempoDecorridoAnos(this.getIniCarreira());
    // Cálculo: 10% dos anos de trabalho * 12
    const baseCalc = parseInt(tempoTrab * 0.1 * 12, 10);
    const calculo = baseCalc * this.getSalLiq();

    if (calculo > 0) {
      return calculo;
    }
    return 0;
  }

  comprometimentoGasto(gasto) {
    if (typeof gasto === 'number' && this.SalLiq > 0 && gasto > 0) {
      return gasto / this.SalLiq;
    }
    return 0;
  }

  // SugestReserv
  sugestReserv() {
    // Executa o cálculo de faixa etária, que atribui automaticamente o atributo SugestReserv
    this.faixaEtaria();
    return this.SugestReserv;
  }

  sugestaoLimSeg() {
    if (this.SalLiq > 0) {
      const segur = this.getSalLiq() * 0.3;
      return parseInt(segur, 10);
    }
    return 0;
  }

  coberturaVida() {
    if (this.getSalLiq() > 0) {
      return parseInt(this.getSalLiq() * 24, 10);
    }
    return 0;
  }

  seguroVida() {
    if (this.getSalLiq() > 0) {
      const patr = this.coberturaVida();
      const premio = patr * 0.0016;

      return parseInt(premio, 10);
    }
    return 0;
  }

  seguroImoveis() {
    if (this.getImoveis() > 0) {
      const patr = this.getImoveis();
      const premio = (patr * 0.003) / 10;

      return parseInt(premio, 10);
    }
    return 0;
  }

  seguroAuto() {
    if (this.getVeiculos() > 0) {
      const patr = this.getVeiculos();
      const premio = (patr * 0.05) / 10;

      return parseInt(premio, 10);
    }
    return 0;
  }

  patrimonioProt(convenio) {
    if (typeof convenio === 'number' && this.getSalLiq() > 0) {
      const vida = this.coberturaVida();
      const imoveis = this.getImoveis();
      const auto = this.getVeiculos();
      const soma = vida + imoveis + auto + convenio;

      return parseInt(soma, 10);
    }
    return 0;
  }

  static montante(vp, parcela, prazo, rentabMM) {
    if (typeof vp === 'number' && typeof parcela === 'number' && typeof prazo === 'number' && typeof rentabMM === 'number') {
      let montante = vp;

      // Cálculo de juros compostos com adição de depósito mensal
      for (let i = 1; i <= prazo; i += 1) {
        montante += parcela;
        montante *= 1 + rentabMM / 100;
      }

      return parseInt(montante, 10);
    }
    return 0;
  }

  static taxaMensal(taxaAnual) {
    if (typeof taxaAnual === 'number' && taxaAnual > 0) {
      const tmpTaxa = 1 + (taxaAnual * 1) / 100;
      const taxaMensal = (tmpTaxa ** (1 / 12) - 1) * 100;
      return taxaMensal;
    }
    return 0;
  }

  planoImovel(perc) {
    if (typeof perc === 'number' && perc > 0 && perc <= 1 && this.getSalLiq() > 0) {
      const plano = this.getSalLiq() * perc;

      return parseInt(plano, 10);
    }
    return 0;
  }

  planoAuto(perc) {
    if (typeof perc === 'number' && perc > 0 && perc <= 1 && this.getSalLiq() > 0) {
      const plano = this.getSalLiq() * perc;

      return parseInt(plano, 10);
    }
    return 0;
  }

  imovelInvest(anos, perc) {
    if (typeof anos === 'number' && anos > 0 && this.planoImovel(perc) > 0) {
      const invest = Ciclo.montante(0, this.planoImovel(perc), anos * 12, Ciclo.taxaMensal(this.getRentab()));

      return parseInt(invest, 10);
    }
    return 0;
  }

  autoInvest(anos, perc) {
    if (typeof anos === 'number' && anos > 0 && this.planoAuto(perc) > 0) {
      const invest = Ciclo.montante(0, this.planoAuto(perc), anos * 12, Ciclo.taxaMensal(this.getRentab()));

      return parseInt(invest, 10);
    }
    return 0;
  }

  resultadoGrafico() {
    return this;
  }

  resultadoAnalise() {
    return this;
  }

  // ******************************************************
  // * GETTERS AND SETTERS                                *
  // ******************************************************

  // Getter e Setter - Email
  getEmail() {
    if (this.Email) {
      return this.Email.toLowerCase();
    }
    return '';
  }

  setEmail(str) {
    if (!str) {
      throw Erro.e14;
    }
    if (str) {
      this.Email = str.toLowerCase();
      return true;
    }
    return false;
  }

  // Getter e Setter - Nome
  getNome() {
    if (this.Nome) {
      return this.Nome;
    }
    return '';
  }
  setNome(str) {
    if (!str) {
      throw Erro.e02;
    }
    if (str.trim().length < 6) {
      throw Erro.t01;
    }
    if (!str.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ. -]+$/)) {
      throw Erro.t02;
    }
    this.Nome = str;
    return true;
  }

  // Getter e Setter - Nasc
  getNasc() {
    if (this.Nasc) {
      return this.Nasc;
    }
    return '';
  }
  setNasc(str) {
    if (!str) {
      throw Erro.t03;
    }
    this.Nasc = str;
    return true;
  }

  // Getter e Setter - EstCivil
  getEstCivil() {
    if (this.EstCivil) {
      return this.EstCivil;
    }
    return 0;
  }
  setEstCivil(str) {
    if (!str) {
      throw Erro.t04;
    }
    if (str < 1 || str > 5) {
      throw Erro.t04;
    }
    this.EstCivil = str;
    return true;
  }

  // Getter e Setter - Filhos
  getFilhos() {
    if (this.Filhos) {
      return this.Filhos;
    }
    return 0;
  }
  setFilhos(str) {
    if (typeof str === 'number' && str >= 0 && str <= 10) {
      this.Filhos = str;
      return true;
    }
    throw Erro.t07;
  }

  // Getter e Setter - SalLiq
  getSalLiq() {
    if (this.SalLiq) {
      return parseInt(this.SalLiq, 10);
    }
    return 0;
  }
  setSalLiq(str) {
    if (!str) {
      throw Erro.t04;
    }
    if (!Number.isInteger(str)) {
      throw Erro.e04;
    }
    if (str < 0) {
      throw Erro.e04;
    }
    this.SalLiq = str;
    return true;
  }

  // Getter e Setter - IniCarreira
  getIniCarreira() {
    if (this.IniCarreira) {
      return this.IniCarreira;
    }
    return '';
  }
  setIniCarreira(str) {
    if (!str) {
      throw Erro.t06;
    }
    this.IniCarreira = str;
    return true;
  }

  // Getter e Setter - Invest
  getInvest() {
    if (this.Invest) {
      return this.Invest;
    }
    return 0;
  }
  setInvest(str) {
    if (typeof str === 'number' && str >= 0) {
      this.Invest = str;
      return true;
    }
    throw Erro.e05;
  }

  // Getter e Setter - Imoveis
  getImoveis() {
    if (this.Imoveis) {
      return this.Imoveis;
    }
    return 0;
  }
  setImoveis(str) {
    if (typeof str === 'number' && str >= 0) {
      this.Imoveis = str;
      return true;
    }
    throw Erro.e06;
  }

  // Getter e Setter - Veiculos
  getVeiculos() {
    if (this.Veiculos) {
      return this.Veiculos;
    }
    return 0;
  }
  setVeiculos(str) {
    if (typeof str === 'number' && str >= 0) {
      this.Veiculos = str;
      return true;
    }
    throw Erro.e07;
  }

  // Getter e Setter - Gasto
  getGasto() {
    if (this.Gasto) {
      return this.Gasto;
    }
    return 0;
  }
  setGasto(str) {
    if (typeof str === 'number' && str > 0) {
      this.Gasto = str;
      return true;
    }
    throw Erro.e08;
  }

  // Getter e Setter - Reserva
  getReserva() {
    if (this.Reserva) {
      return this.Reserva;
    }
    return 0;
  }
  setReserva(str) {
    if (typeof str === 'number' && str >= 0) {
      this.Reserva = str;
      return true;
    }
    throw Erro.e09;
  }

  // Getter e Setter - Disponib
  getDisponib() {
    if (this.Disponib) {
      return this.Disponib;
    }
    return 0;
  }
  setDisponib(str) {
    if (typeof str === 'number' && str > 0) {
      this.Disponib = str;
      return true;
    }
    throw Erro.t09;
  }

  // Getter e Setter - ReservaPrev
  getReservaPrev() {
    if (this.ReservaPrev) {
      return this.ReservaPrev;
    }
    return 0;
  }
  setReservaPrev(str) {
    if (typeof str === 'number' && str >= 0) {
      this.ReservaPrev = str;
      return true;
    }
    throw Erro.e10;
  }

  // Getter e Setter - IdadeAposent
  getIdadeAposent() {
    if (this.IdadeAposent) {
      return this.IdadeAposent;
    }
    return 0;
  }
  setIdadeAposent(str) {
    const idadeAtual = this.idadeAtual();
    if (typeof str === 'number' && str >= idadeAtual && str <= 99) {
      this.IdadeAposent = str;
      return true;
    }
    throw Erro.e11;
  }

  // Getter e Setter - Rentab
  getRentab() {
    if (this.Rentab) {
      return this.Rentab;
    }
    return 0;
  }
  setRentab(str) {
    if (typeof str === 'number' && str > 0) {
      this.Rentab = str;
      return true;
    }
    throw Erro.e12;
  }

  // Getter e Setter - Saude
  getSaude() {
    if (this.Saude) {
      return this.Saude;
    }
    return 0;
  }
  setSaude(str) {
    if (typeof str === 'number' && str > 0) {
      this.Saude = str;
      return true;
    }
    throw Erro.e13;
  }

  // Getter e Setter - ImovelInvestPrazo
  getImovelInvestPrazo() {
    if (this.ImovelInvestPrazo) {
      return this.ImovelInvestPrazo;
    }
    return 0;
  }
  setImovelInvestPrazo(str) {
    if (typeof str === 'number' && str > 0) {
      this.ImovelInvestPrazo = str;
      return true;
    }
    throw Erro.e15;
  }

  // Getter e Setter - ImovelInvestPerc
  getImovelInvestPerc() {
    if (this.ImovelInvestPerc) {
      return this.ImovelInvestPerc;
    }
    return 0;
  }
  setImovelInvestPerc(str) {
    if (typeof str === 'number' && str > 0) {
      this.ImovelInvestPerc = str;
      return true;
    }
    throw Erro.e16;
  }

  // Getter e Setter - AutoInvestPrazo
  getAutoInvestPrazo() {
    if (this.AutoInvestPrazo) {
      return this.AutoInvestPrazo;
    }
    return 0;
  }
  setAutoInvestPrazo(str) {
    if (typeof str === 'number' && str > 0) {
      this.AutoInvestPrazo = str;
      return true;
    }
    throw Erro.e17;
  }

  // Getter e Setter - AutoInvesPerc
  getAutoInvestPerc() {
    if (this.AutoInvesPerc) {
      return this.AutoInvesPerc;
    }
    return 0;
  }
  setAutoInvestPerc(str) {
    if (typeof str === 'number' && str > 0) {
      this.AutoInvesPerc = str;
      return true;
    }
    throw Erro.e18;
  }
}

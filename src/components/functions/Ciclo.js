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
// SugestReserv = Sugestão de reserva mensal
// 
// - Segurança
// Saude        = Gasto mensal com convênios de saúde/odontolôgico/funerário
// SegVida      = Gasto mensal com seguro de vida individual ou coletivo
// SegImov      = Gasto mensal com seguro residencial
// SegAuto      = Gasto mensal com seguro de automóveis
// 
// - Consumo
// nihil
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
// - saldoReserva (nihil)
//       Retorna o resto da subtração do valor em investimento - poupança de emergencia 
//       ideal. Retorno pode ser negativo.
// 
// - sugestaoReserva (nihil)
//       Retorna a sugestão de reserva para aposentadoria de acordo com a idade e renda
//       do usuário.
// 
// - sugestaoLimSeg (nihil)
//       Retorna sugestão de limite mensal para aplicação em seguridade.
// 
// - comprometSeg (nihil)
//       Retorna o percentual de comprometimento da renda líquida com itens de 
//       seguridade.
// 
// - patrimonioProt (nihil)
//       Retorna o valor total do patrimônio protegido de acordo com as coberturas 
//       registradas em seguridade.
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

import hashCode from './hashcode';
import Erro from './Erro';

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

  recuperar(email) {
    return email;
  }

  salvar() {
    return this;
  }

  tempoDecorridoAnos(data) {
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
            yy: '%d'
        }
    });

    const tempoDecorridoAA = moment(data, 'DD/MM/YYYY').fromNow(true);

    if (Number.isInteger(parseInt(tempoDecorridoAA, 10))) {
      return parseInt(tempoDecorridoAA, 10);
    }

    return 0;
  }

  idadeAtual() {
    return this.tempoDecorridoAnos(this.getNasc());
  }

  faixaEtaria() {
    if (this.idadeAtual() <= 30) {
      this.SugestReserv = 0.1;
      return 'Até 30 anos';
    }

    if (this.idadeAtual() > 30) {
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
    const tempoTrab = this.tempoDecorridoAnos(this.getIniCarreira());
    // Cálculo: 10% dos anos de trabalho * 12 
    const baseCalc = parseInt((tempoTrab * 0.1) * 12, 10);
    const calculo = baseCalc * this.getSalLiq();

    if (calculo > 0) {
      console.log('esta retorando', calculo);
      return calculo;
    }
    return 0;
  }

  comprometimentoGasto(gasto) {
    if (this.SalLiq > 0) {
      return gasto / this.SalLiq;
    }
    return 0;
  }

  saldoReserva() {
    return this;
  }

  sugestaoReserva() {
    return this;
  }

  sugestaoLimSeg() {
    return this;
  }

  comprometSeg() {
    return this;
  }

  patrimonioProt() {
    return this;
  }

  imovelInvest() {
    return this;
  }

  autoInvest() {
    return this;
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
    return this.Email.toLowerCase();
  }
  setEmail(str) {
    if (str) {
      this.Email = str.toLowerCase();
    }
  }

  // Getter e Setter - Nome
  getNome() {
    return this.Nome;
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
  }

  // Getter e Setter - Nasc
  getNasc() {
    return this.Nasc;
  }
  setNasc(str) {
    if (!str) {
      throw Erro.t03;
    }
    if (str === '') {
      throw Erro.t03; 
    }
    this.Nasc = str;
  }

  // Getter e Setter - EstCivil
  getEstCivil() {
    return this.EstCivil;
  }
  setEstCivil(str) {
    if (!str) {
      throw Erro.t04;
    }
    if (str < 1 || str > 5) {
      throw Erro.t04;
    }
    this.EstCivil = str;
  }

  // Getter e Setter - Filhos
  getFilhos() {
    return this.Filhos;
  }
  setFilhos(str) {
    if (!str) {
      throw Erro.t07;
    }
    if (str < 1 || str > 10) {
      throw Erro.t07;
    }
    this.Filhos = str;
  }

  // Getter e Setter - SalLiq
  getSalLiq() {
    return Number.parseInt(this.SalLiq, 10);
  }
  setSalLiq(str) {
    if (!str) {
      throw Erro.t05;
    }
    if (!Number.isInteger(str)) {
      throw Erro.e04;
    }
    this.SalLiq = str;
  }

  // Getter e Setter - IniCarreira
  getIniCarreira() {
    return this.IniCarreira;
  }
  setIniCarreira(str) {
    if (!str) {
      throw Erro.t06;
    }
    if (str === '') {
      throw Erro.t06;
    }
    this.IniCarreira = str;
  }

  // Getter e Setter - Invest
  getInvest() {
    return this.Invest;
  }
  setInvest(str) {
    if (str >= 0) {
      this.Invest = str;
    } else {
      throw Erro.e05;
    }
  }

  // Getter e Setter - Imoveis
  getImoveis() {
    return this.Imoveis;
  }
  setImoveis(str) {
    if (str >= 0) {
      this.Imoveis = str;
    } else {
      throw Erro.e06;
    }
  }

  // Getter e Setter - Veiculos
  getVeiculos() {
    return this.Veiculos;
  }
  setVeiculos(str) {
    if (str >= 0) {
      this.Veiculos = str;
    } else {
      throw Erro.e07;
    }
  }

  // Getter e Setter - Gasto
  getGasto() {
    return this.Gasto;
  }
  setGasto(str) {
    if (str) {
      this.Gasto = str;
    }
  }

  // Getter e Setter - Reserva
  getReserva() {
    if (this.reserva) {
      return this.Reserva;
    }
    return 0;
  }
  setReserva(str) {
    if (str) {
      this.Reserva = str;
    }
  }

  // Getter e Setter - Disponib
  getDisponib() {
    return this.Disponib;
  }
  setDisponib(str) {
    if (str) {
      this.Disponib = str;
    }
  }

  // Getter e Setter - ReservaPrev
  getReservaPrev() {
    return this.ReservaPrev;
  }
  setReservaPrev(str) {
    if (str) {
      this.ReservaPrev = str;
    }
  }

  // Getter e Setter - IdadeAposent
  getIdadeAposent() {
    return this.IdadeAposent;
  }
  setIdadeAposent(str) {
    if (str) {
      this.IdadeAposent = str;
    }
  }

  // Getter e Setter - Rentab
  getRentab() {
    return this.Rentab;
  }
  setRentab(str) {
    if (str) {
      this.Rentab = str;
    }
  }

  // Getter e Setter - SugestReserv
  getSugestReserv() {
    // Executa o cálculo de faixa etária, que atribui automaticamente o atributo SugestReserv
    this.faixaEtaria();
    return this.SugestReserv;
  }
  setSugestReserv(str) {
    if (str) {
      this.SugestReserv = str;
    }
  }

  // Getter e Setter - Saude
  getSaude() {
    return this.Saude;
  }
  setSaude(str) {
    if (str) {
      this.Saude = str;
    }
  }

  // Getter e Setter - SegVida
  getSegVida() {
    return this.SegVida;
  }
  setSegVida(str) {
    if (str) {
      this.SegVida = str;
    }
  }

  // Getter e Setter - SegImov
  getSegImov() {
    return this.SegImov;
  }
  setSegImov(str) {
    if (str) {
      this.SegImov = str;
    }
  }

  // Getter e Setter - SegAuto
  getSegAuto() {
    return this.SegAuto;
  }
  setSegAuto(str) {
    if (str) {
      this.SegAuto = str;
    }
  }
}

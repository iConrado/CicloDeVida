import hashCode from './hashcode';
import Erro from './Erro';

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
// nihil
// 
// - Resultado
// nihil
// 
// 
// MÉTODOS
// 
// - Constructor (nihil)
//       Inicializa a instância da classe com o app, certificando que não haverá mais 
//       de uma instância por sessão.
// 
// - Recuperar (email)
//       Recupera uma consultoria através de um endereço de e-mail.
//       Limpa a instância e refaz todos os campos de acordo com o obtido no objeto 
//       armazenado.
// 
// - Salvar (nihil)
//       Armazena a consultoria para que possa ser recuperada posteriormente.
//       Deve permitir salvar a consultoria a qualquer momento, independente da 
//       quantidade de informações registradas.
// 
// - PatrimonioEsperado (nihil)
//       Retorna o valor de patrimônio referência de acordo com a idade e renda.
// 
// - SaldoReserva (nihil)
//       Retorna o resto da subtração do valor em investimento - poupança de emergencia 
//       ideal. Retorno pode ser negativo.
// 
// - SugestaoReserva (nihil)
//       Retorna a sugestão de reserva para aposentadoria de acordo com a idade e renda
//       do usuário.
// 
// - SugestaoLimSeg (nihil)
//       Retorna sugestão de limite mensal para aplicação em seguridade.
// 
// - ComprometSeg (nihil)
//       Retorna o percentual de comprometimento da renda líquida com itens de 
//       seguridade.
// 
// - PatrimonioProt (nihil)
//       Retorna o valor total do patrimônio protegido de acordo com as coberturas 
//       registradas em seguridade.
// 
// - ImovelInvest (nihil)
//       Retorna o valor de imóvel para investimento de acordo com um prazo pré-
//       estabelecido.
// 
// - AutoInvest (nihil)
//       Retorna o valor de automóvel para compra ou troca de acordo com um prazo pré-
//       estabelecido.
// 
// - ResultadoGrafico (nihil)
//       Retorna objeto JSON com os valor em cadas área para montagem do gráfico.
// 
// - ResultadoAnalise (nihil)
//       Retorna o tipo de resultado de acordo com a análise do ciclo de vida do 
//       usuário, caso saldo positivo ou negativo.
// 

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

  teste(arg) {
    if (arg === 'Arroz-doce') {
      console.log('Função COM erro');
      throw Erro.e03;
    }
    console.log('Função sem erro');
    return true;
  }

  recuperar(email) {
    return email;
  }

  salvar() {
    return this;
  }

  patrimonioEsperado() {
    return this;
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
  get Email() {
    return this.Email.toLowerCase();
  }
  set Email(str) {
    if (str) {
      this.Email = str;
    }
  }

  // Getter e Setter - Nome
  get Nome() {
    return this.Nome.toUpperCase();
  }
  set Nome(str) {
    if (str) {
      this.Nome = str;
    }
  }

  // Getter e Setter - Nasc
  get Nasc() {
    return this.Nasc;
  }
  set Nasc(str) {
    if (str) {
      this.Nasc = str;
    }
  }

  // Getter e Setter - EstCivil
  get EstCivil() {
    return this.EstCivil;
  }
  set EstCivil(str) {
    if (str) {
      this.EstCivil = str;
    }
  }

  // Getter e Setter - Filhos
  get Filhos() {
    return this.Filhos;
  }
  set Filhos(str) {
    if (str) {
      this.Filhos = str;
    }
  }

  // Getter e Setter - SalLiq
  get SalLiq() {
    return this.SalLiq;
  }
  set SalLiq(str) {
    if (str) {
      this.SalLiq = str;
    }
  }

  // Getter e Setter - IniCarreira
  get IniCarreira() {
    return this.IniCarreira;
  }
  set IniCarreira(str) {
    if (str) {
      this.IniCarreira = str;
    }
  }

  // Getter e Setter - Invest
  get Invest() {
    return this.Invest;
  }
  set Invest(str) {
    if (str) {
      this.Invest = str;
    }
  }

  // Getter e Setter - Imoveis
  get Imoveis() {
    return this.Imoveis;
  }
  set Imoveis(str) {
    if (str) {
      this.Imoveis = str;
    }
  }

  // Getter e Setter - Veiculos
  get Veiculos() {
    return this.Veiculos;
  }
  set Veiculos(str) {
    if (str) {
      this.Veiculos = str;
    }
  }

  // Getter e Setter - Gasto
  get Gasto() {
    return this.Gasto;
  }
  set Gasto(str) {
    if (str) {
      this.Gasto = str;
    }
  }

  // Getter e Setter - Reserva
  get Reserva() {
    return this.Reserva;
  }
  set Reserva(str) {
    if (str) {
      this.Reserva = str;
    }
  }

  // Getter e Setter - Disponib
  get Disponib() {
    return this.Disponib;
  }
  set Disponib(str) {
    if (str) {
      this.Disponib = str;
    }
  }

  // Getter e Setter - ReservaPrev
  get ReservaPrev() {
    return this.ReservaPrev;
  }
  set ReservaPrev(str) {
    if (str) {
      this.ReservaPrev = str;
    }
  }

  // Getter e Setter - IdadeAposent
  get IdadeAposent() {
    return this.IdadeAposent;
  }
  set IdadeAposent(str) {
    if (str) {
      this.IdadeAposent = str;
    }
  }

  // Getter e Setter - Rentab
  get Rentab() {
    return this.Rentab;
  }
  set Rentab(str) {
    if (str) {
      this.Rentab = str;
    }
  }

  // Getter e Setter - Saude
  get Saude() {
    return this.Saude;
  }
  set Saude(str) {
    if (str) {
      this.Saude = str;
    }
  }

  // Getter e Setter - SegVida
  get SegVida() {
    return this.SegVida;
  }
  set SegVida(str) {
    if (str) {
      this.SegVida = str;
    }
  }

  // Getter e Setter - SegImov
  get SegImov() {
    return this.SegImov;
  }
  set SegImov(str) {
    if (str) {
      this.SegImov = str;
    }
  }

  // Getter e Setter - SegAuto
  get SegAuto() {
    return this.SegAuto;
  }
  set SegAuto(str) {
    if (str) {
      this.SegAuto = str;
    }
  }
}

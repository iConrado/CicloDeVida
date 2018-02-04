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

function Ciclo() {
    // Mecanismo Singleton para garantir uma única instância da classe para a sessão do app
    if (!Ciclo.instance) {
      Ciclo.instance = this;
    }
    const d = new Date();
    this.id = hashCode(d.getTime().toString());
    return Ciclo.instance;
/*
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

*/
  // ******************************************************
  // * GETTERS AND SETTERS                                *
  // ******************************************************

  // Getter e Setter - Email
  Ciclo.prototype.getEmail = function() {
    return this.Email.toLowerCase();
  }
  Ciclo.prototype.setEmail = function(str) {
    if (str) {
      this.Email = str.toLowerCase();
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Nome
  Ciclo.prototype.getNome = function() {
    if (this.Nome === undefined) {
      return 'Indefinido';
    }
    return this.Nome;
  }
  Ciclo.prototype.setNome = function(str) {
    if (str) {
      this.Nome = str;
    } else {
      throw Erro.e02;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Nasc
  Ciclo.prototype.getNasc = function() {
    return this.Nasc;
  }
  Ciclo.prototype.setNasc = function(str) {
    if (str) {
      this.Nasc = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - EstCivil
  Ciclo.prototype.getEstCivil = function() {
    return this.EstCivil;
  }
  Ciclo.prototype.setEstCivil = function(str) {
    if (str) {
      this.EstCivil = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Filhos
  Ciclo.prototype.getFilhos = function() {
    return this.Filhos;
  }
  Ciclo.prototype.setFilhos = function(str) {
    if (str) {
      this.Filhos = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - SalLiq
  Ciclo.prototype.getSalLiq = function() {
    return this.SalLiq;
  }
  Ciclo.prototype.setSalLiq = function(str) {
    if (str) {
      this.SalLiq = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - IniCarreira
  Ciclo.prototype.getIniCarreira = function() {
    return this.IniCarreira;
  }
  Ciclo.prototype.setIniCarreira = function(str) {
    if (str) {
      this.IniCarreira = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Invest
  Ciclo.prototype.getInvest = function() {
    return this.Invest;
  }
  Ciclo.prototype.setInvest = function(str) {
    if (str) {
      this.Invest = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Imoveis
  Ciclo.prototype.getImoveis = function() {
    return this.Imoveis;
  }
  Ciclo.prototype.setImoveis = function(str) {
    if (str) {
      this.Imoveis = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Veiculos
  Ciclo.prototype.getVeiculos = function() {
    return this.Veiculos;
  }
  Ciclo.prototype.setVeiculos = function(str) {
    if (str) {
      this.Veiculos = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Gasto
  Ciclo.prototype.getGasto = function() {
    return this.Gasto;
  }
  Ciclo.prototype.setGasto = function(str) {
    if (str) {
      this.Gasto = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Reserva
  Ciclo.prototype.getReserva = function() {
    return this.Reserva;
  }
  Ciclo.prototype.setReserva = function(str) {
    if (str) {
      this.Reserva = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Disponib
  Ciclo.prototype.getDisponib = function() {
    return this.Disponib;
  }
  Ciclo.prototype.setDisponib = function(str) {
    if (str) {
      this.Disponib = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - ReservaPrev
  Ciclo.prototype.getReservaPrev = function() {
    return this.ReservaPrev;
  }
  Ciclo.prototype.setReservaPrev = function(str) {
    if (str) {
      this.ReservaPrev = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - IdadeAposent
  Ciclo.prototype.getIdadeAposent = function() {
    return this.IdadeAposent;
  }
  Ciclo.prototype.setIdadeAposent = function(str) {
    if (str) {
      this.IdadeAposent = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Rentab
  Ciclo.prototype.getRentab = function() {
    return this.Rentab;
  }
  Ciclo.prototype.setRentab = function(str) {
    if (str) {
      this.Rentab = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - Saude
  Ciclo.prototype.getSaude = function() {
    return this.Saude;
  }
  Ciclo.prototype.setSaude = function(str) {
    if (str) {
      this.Saude = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - SegVida
  Ciclo.prototype.getSegVida = function() {
    return this.SegVida;
  }
  Ciclo.prototype.setSegVida = function(str) {
    if (str) {
      this.SegVida = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - SegImov
  Ciclo.prototype.getSegImov = function() {
    return this.SegImov;
  }
  Ciclo.prototype.setSegImov = function(str) {
    if (str) {
      this.SegImov = str;
    }
  }

  // Ciclo.prototype.getter e Ciclo.prototype.setter - SegAuto
  Ciclo.prototype.getSegAuto = function() {
    return this.SegAuto;
  }
  Ciclo.prototype.setSegAuto = function(str) {
    if (str) {
      this.SegAuto = str;
    }
  }
}

export default Ciclo;

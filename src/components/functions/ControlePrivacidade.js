export default class ControlePrivacidade {
  constructor() {
    // Mecanismo Singleton para garantir uma única instância da classe para a sessão do app
    if (!ControlePrivacidade.instance) {
      ControlePrivacidade.instance = this;
    }

    return ControlePrivacidade.instance;
  }

  getAceitouPrivacidade() {
    if (this.AceitouPrivacidade) {
      return true;
    }
    return false;
  }

  setAceitouPrivacidade(valor) {
    if (valor && typeof valor === 'boolean') {
      this.AceitouPrivacidade = valor;
      return true;
    }
    return false;
  }
}

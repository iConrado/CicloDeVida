/** ************************************************************************************************
 * enviarEmail
 * Função para enviar os emails quando um usuário solicitar contato pela consultoria/coaching
 *
 * @param   {object}     dados       - objeto com as informações a serem enviadas por email
 * @default   {
 *              id: string,
 *              nome: string,
 *              permiteEmail: boolean,
 *              email: string,
 *              permiteTel: boolean,
 *              tel: string,
 *              timestamp: string
 *            }
 * @todo Atualmente os emails são enviados para as caixas de email do staff.
 *       Quaisquer alterações dos destinatários deverão ser realizadas no projeto
 *       Cloud Function do Firebase (apiCiclo).
 *************************************************************************************************** */

import firebase from 'react-native-firebase';

import Ciclo from './Ciclo';

import monetizar from './monetizar';

const enviarEmail = async dados => {
  const C = new Ciclo();

  const arrEstCiv = [
    { id: 0, value: 0, label: 'N/D' },
    { id: 1, value: 1, label: 'Solteiro' },
    { id: 2, value: 2, label: 'Casado/União Estável' },
    { id: 3, value: 3, label: 'Divorciado' },
    { id: 4, value: 4, label: 'Viúvo' },
    { id: 5, value: 5, label: 'Separado' },
  ];

  const patrim = C.getInvest() + C.getImoveis() + C.getVeiculos();

  try {
    const enviar = firebase.functions().httpsCallable('sendEmail');

    // const email = dados || {};

    const subject = 'SOLICITAÇÃO DE CONTATO - APP CICLO DE VIDA';

    // Construção do corpo do email
    const arrText = [];
    arrText.push('CONSULTORIA CICLO DE VIDA');
    arrText.push('----------------------------------------------------------');
    arrText.push(' ');
    arrText.push('Solicitação de contato pelo APP:');
    arrText.push(' ');
    arrText.push(`Id no App: ${dados.id || 'Não informado'}`);
    arrText.push(`Nome: ${dados.nome || 'Não informado'}`);
    arrText.push('Contatos permitidos:');
    if (dados.permiteEmail) arrText.push(`email: ${dados.email || 'Não informado'}`);
    if (dados.permiteTel) arrText.push(`telefone: ${dados.tel || 'Não informado'}`);
    arrText.push(' ');
    arrText.push('----------------------------------------------------------');
    arrText.push('SIMULAÇÃO');
    arrText.push('----------------------------------------------------------');
    arrText.push(' ');
    arrText.push('INÍCIO');
    arrText.push(`Nome: ${C.getNome()}`);
    arrText.push(`Email: ${C.getEmail()}`);
    arrText.push(`Data Nasc.: ${C.getNasc()}`);
    arrText.push(`Estado Civil: ${arrEstCiv[C.getEstCivil()].label}`);
    arrText.push(`Filhos: ${C.getFilhos()}`);
    arrText.push(`Prim. Emprego: ${C.getIniCarreira()}`);
    arrText.push(`Sal. Líquido: ${monetizar(C.getSalLiq())}`);
    arrText.push(' ');
    arrText.push('PATRIMÔNIO');
    arrText.push(`Investimentos: ${monetizar(C.getInvest())}`);
    arrText.push(`Imóveis: ${monetizar(C.getImoveis())}`);
    arrText.push(`Veículos: ${monetizar(C.getVeiculos())}`);
    arrText.push(`Patrimônio formado: ${monetizar(patrim)}`);
    arrText.push(`Patrimônio esperado: ${monetizar(C.patrimonioEsperado())}`);
    arrText.push(`Percentual Patrimônio esperado: ${((patrim / C.patrimonioEsperado()) * 100).toFixed(2)}%`);
    arrText.push(' ');
    arrText.push('RESERVA DE EMERGÊNCIA');
    arrText.push(`Gasto Mensal: ${monetizar(C.getGasto())}`);
    arrText.push(`Comprometimento da renda com gastos: ${(C.comprometimentoGasto(C.getGasto()) * 100).toFixed(1)}%`);
    arrText.push(`Reserva: ${monetizar(C.getReserva())}`);
    arrText.push(' ');
    arrText.push('APOSENTADORIA');
    arrText.push(`Disponibilidade mensal: ${monetizar(C.getDisponib())}`);
    arrText.push(`Reserva em previdência privada: ${monetizar(C.getReservaPrev())}`);
    arrText.push(`Idade para aposentadoria: ${C.getIdadeAposent()}`);
    arrText.push(`Rentabilidade estimada (a.a.): ${C.getRentab()}`);
    arrText.push(' ');
    arrText.push('SEGURANÇA');
    arrText.push(`Convênios de saúde: ${monetizar(C.getSaude())}`);
    arrText.push(`Seguro de vida: ${monetizar(C.getSegVida())}`);
    arrText.push(`Seguro Residencial: ${monetizar(C.getSegImov())}`);
    arrText.push(`Seguro Auto: ${monetizar(C.getSegAuto())}`);
    arrText.push(' ');
    arrText.push('CONSUMO E AMPLIAÇÃO DE PATRIMÔNIO');
    arrText.push(`Imóveis - prazo em anos: ${C.getImovelInvestPrazo()}`);
    arrText.push(`Imóveis - percentual da renda: ${(C.getImovelInvestPerc() * 100).toFixed(1)}%`);
    arrText.push(`Automóveis - prazo em anos: ${C.getAutoInvestPrazo()}`);
    arrText.push(`Automóveis - percentual da renda: ${(C.getAutoInvestPerc() * 100).toFixed(1)}%`);
    arrText.push(' ');
    arrText.push('RESULTADO');
    arrText.push(`Análise da simulação: ${C.resultadoAnalise().resultado ? 'Sucesso' : 'A melhorar'}`);
    arrText.push(' ');
    arrText.push('ESTATÍSTICAS');
    arrText.push(`Qtde. acessos app:: ${C.getAcessosApp()}`);
    arrText.push(`Qtde. visualizações de resultado da análise: ${C.getVisualizacoesResultado()}`);
    arrText.push(' ');
    arrText.push('----------------------------------------------------------');
    arrText.push(`Data e hora da solicitação: ${dados.timestamp || new Date()}`);
    arrText.push('-----------------------------------------------------------------------------');
    arrText.push('Mensagem enviada automaticamente');

    // Formatação do corpo em texto puro e HTML
    const text = arrText.join('\u000A');
    const html = `<html>${arrText.join('<br>')}</html>`;

    const email = { subject, text, html };

    const ret = await enviar(email);
    if (ret.data === true) {
      return true;
    }
    return false;
  } catch (e) {
    // console.log(e);
    return false;
  }
};

export default enviarEmail;

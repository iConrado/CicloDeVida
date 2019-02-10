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

const enviarEmail = async dados => {
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
    arrText.push(`Data e hora da solicitação: ${dados.timestamp || new Date()}`);
    arrText.push('-----------------------------------------------------------------------------');
    arrText.push('Mensagem enviada automaticamente');

    const text = arrText.join('\u000A');
    const html = `<html>${arrText.join('<br>')}</html>`;

    const email = { subject, text, html };

    const ret = await enviar(email);
    if (ret.data === true) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default enviarEmail;

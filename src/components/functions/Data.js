
export default class Data {
  //Transforma um objeto Date em uma data no formato DD/MM/AAAA
  static dataToString(d) {
    const dia = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const mes = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    return `${dia}/${mes}/${d.getFullYear()}`;
  }

  //Transforma um objeto Date em uma data no formato DD/MM/AA
  static dataToStringAA(d) {
    const dia = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const mes = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    return `${dia}/${mes}/${d.getFullYear().toString().substr(2, 2)}`;
  }

  static stringToData(d) {
    //Converte string no formato DD/MM/AAAA em objetos Date
    const dia = d.substr(0, 2);
    const mes = d.substr(3, 2);
    const ano = d.substr(6, 4);
    const data = new Date(ano, mes - 1, dia);
    return data;
  }
}

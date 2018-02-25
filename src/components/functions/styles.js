import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    //flex: 1, // Não permite a scroolview rolar a tela
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  viewTitulo: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewBotoes: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
  },
  viewHorizontal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  viewVertical: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  viewCentral: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCompHoriz: {
    width: '50%',
  },
  viewIcone: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 13,
    backgroundColor: '#48AEB5'
  },
  viewPosIcone: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  viewLogo: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#E7A730'
  },
  viewPosLogo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#14567A',
  },
  label: {
    color: '#666',
  },
  espacador: {
    marginTop: 15,
  },
  separador: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
  },
  botao: {
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
    paddingVertical: 4,
    marginTop: 10,
    borderRadius: 2,
    elevation: 4,
    backgroundColor: '#5C86F5'
  },
  txtBotao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 5,
  },
  txValor: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  txValorPos: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'green',
  },
  txValorNeg: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'red',
  },
  imgIcone: {
    height: 35,
    width: 35,
  },
  imgLogo: {
    height: 24,
    width: 24,
  },
  //***********************************
  //* HOME_SCREEN                     *
  //***********************************
  home_txFilhos: {
    width: '20%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  home_txSalLiq: {
    width: '20%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  home_slFilhos: {
    width: '80%',
    height: 40,
  },
  home_slSalLiq: {
    width: '80%',
    height: 40,
  },
  home_inpNome: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_inpSal: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_inpEmail: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_pkEstCiv: {
    width: '100%',
    height: 38,
    color: '#5E5E5E',
  },
  home_viewEstCiv: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
  home_dtNasc: {
    width: '85%',
  },
  home_dtIniCarr: {
    width: '42.5%',
  },
  //***********************************
  //* PATRIMONIO_SCREEN               *
  //***********************************
  patrim_slIcone: {
    width: '65%',
    height: 40,
  },
  patrim_txIcone: {
    width: '35%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  //***********************************
  //* RESERVA_SCREEN                  *
  //***********************************
  reserva_viewCalculo: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserva_slider: {
    width: '70%',
    height: 40,
  },
  reserva_txDireita: {
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  reserva_lbGasto: {
    width: '70%',
    textAlignVertical: 'center',
  },
  reserva_lbCalculo: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  //***********************************
  //* APOSENTADORIA_SCREEN            *
  //***********************************
  aposent_viewCentral: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
  },
  aposent_vinheta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  aposent_viewCalculo: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aposent_txDireita: {
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  aposent_lbCalculo: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  aposent_slider: {
    width: '70%',
    height: 40,
  },
  aposent_Input: {
    width: '100%',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#14567A', //#5BA849
    paddingHorizontal: 5,
  },
});

export default styles;

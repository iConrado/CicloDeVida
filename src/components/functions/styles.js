import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  viewTitulo: {
    width: '100%',
    alignItems: 'center',
  },
  viewBotoes: {
    width: '100%',
    alignItems: 'center',
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
  imgIcone: {
    height: 35,
    width: 35,
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
});

export default styles;

import HomeScreen from './components/HomeScreen';
import PatrimonioScreen from './components/PatrimonioScreen';
import ReservaScreen from './components/ReservaScreen';
import AposentadoriaScreen from './components/AposentadoriaScreen';
import SegurancaScreen from './components/SegurancaScreen';
import ConsumoScreen from './components/ConsumoScreen';
import ResultadoScreen from './components/ResultadoScreen';
import SaibaMaisScreen from './components/SaibaMaisScreen';
import FinalScreen from './components/FinalScreen';

import TutorialScreen from './components/TutorialScreen';
import Tutorial2Screen from './components/Tutorial2Screen';

import LoginScreen from './components/LoginScreen';
import CriarConta from './components/login/CriarConta';
import Entrar from './components/login/Entrar';
import Esqueci from './components/login/Esqueci';

export const routesApp = {
  Simulação: { screen: HomeScreen },
  Patrimonio: { screen: PatrimonioScreen },
  Reserva: { screen: ReservaScreen },
  Aposentadoria: { screen: AposentadoriaScreen },
  Seguranca: { screen: SegurancaScreen },
  Consumo: { screen: ConsumoScreen },
  Resultado: { screen: ResultadoScreen },
  SaibaMais: { screen: SaibaMaisScreen },
  Final: { screen: FinalScreen },
};

export const routesIntro = {
  Tutorial: { screen: TutorialScreen },
  Tutorial2: { screen: Tutorial2Screen },
};

export const routesAuth = {
  SignIn: { screen: LoginScreen },
  SignUp: { screen: CriarConta },
  Entrar: { screen: Entrar },
  Esqueci: { screen: Esqueci },
};

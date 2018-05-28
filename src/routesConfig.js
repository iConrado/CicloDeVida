// Dados de mock para abertura mais rápida
import mock from './components/functions/mock';

const routesConfig = {
  App: {
    initialRouteName: 'Home',
    initialRouteParams: mock,
    headerMode: 'float',
  },
  Auth: {
    initialRouteName: 'SignIn',
    headerMode: 'none',
  },
};

export default routesConfig;

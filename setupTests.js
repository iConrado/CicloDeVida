const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('react-native-mock-render/mock');
jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true });
configure({ adapter: new Adapter() });

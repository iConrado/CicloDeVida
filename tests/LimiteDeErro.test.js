import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import LimiteDeErro from '../src/components/functions/LimiteDeErro';


const app = shallow(<LimiteDeErro />);

describe('LimiteDeErro', () => {
  it('renderiza corretamente', () => {
    expect(app).toMatchSnapshot();
  });

  it('renderiza com erro', () => {
    const func = jest.fn(() => {
      app.instance().componentDidCatch({ error: 'erro' }, { info: 'info erro' });
    });
    func();
    expect(app.state('hasError')).toBe(true);
  });
});

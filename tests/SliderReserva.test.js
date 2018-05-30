import React from 'react';
import { shallow } from 'enzyme';
import Slider from 'react-native-slider';

import SliderReserva from '../src/components/reserva/SliderReserva';

describe('SliderReserva', () => {
  let ret;
  const retorno = valor => {
    ret = valor;
  };
  const app = shallow(<SliderReserva inicial={50} retorno={retorno} />);
  const app2 = shallow(<SliderReserva retorno={retorno} />);

  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('slider sem o valor inicial', () => {
    app2
      .find(Slider)
      .at(0)
      .simulate('valueChange', 30);
    expect(app2.state('tmpReserva')).toBe(30);
  });

  it('zera o slider', () => {
    app
      .find(Slider)
      .at(0)
      .simulate('valueChange', 0);
    expect(app.state('tmpReserva')).toBe(0);
  });

  it('altera o valor do slider', () => {
    app
      .find(Slider)
      .at(0)
      .simulate('valueChange', 70);
    expect(app.state('tmpReserva')).toBe(70);
  });

  it('retorna valor do slider', () => {
    app
      .find(Slider)
      .at(0)
      .simulate('slidingComplete', 70);
    expect(ret).toBe(70);
  });
});

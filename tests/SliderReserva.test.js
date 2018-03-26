import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderReserva from '../src/components/reserva/SliderReserva';

it('renders correctly', () => {
  const rendered = renderer.create(<SliderReserva />).toJSON();
  expect(rendered).toMatchSnapshot();
});

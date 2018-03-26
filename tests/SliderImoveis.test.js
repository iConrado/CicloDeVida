import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderImoveis from '../src/components/patrimonio/SliderImoveis';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderImoveis />).toJSON();
  expect(rendered).toMatchSnapshot();
});

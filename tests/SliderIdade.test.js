import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderIdade from '../src/components/aposentadoria/SliderIdade';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderIdade />).toJSON();
  expect(rendered).toMatchSnapshot();
});

import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderFilhos from '../src/components/home/SliderFilhos';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderFilhos />).toJSON();
  expect(rendered).toMatchSnapshot();
});

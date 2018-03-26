import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderDisponib from '../src/components/aposentadoria/SliderDisponib';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderDisponib />).toJSON();
  expect(rendered).toMatchSnapshot();
});

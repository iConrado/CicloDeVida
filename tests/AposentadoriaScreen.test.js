import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import AposentadoriaScreen from '../src/components/AposentadoriaScreen';


it('renders correctly', () => {
  const rendered = renderer.create(<AposentadoriaScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});

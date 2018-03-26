import renderer from 'react-test-renderer';

import React from 'react';
import SegurancaScreen from '../src/components/SegurancaScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<SegurancaScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});

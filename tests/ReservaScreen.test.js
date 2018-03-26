import renderer from 'react-test-renderer';

import React from 'react';
import ReservaScreen from '../src/components/ReservaScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<ReservaScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});

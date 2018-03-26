import renderer from 'react-test-renderer';

import React from 'react';
import HomeScreen from '../src/components/HomeScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<HomeScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

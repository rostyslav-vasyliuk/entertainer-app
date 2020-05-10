import React from 'react';
import AppIntroOverlay from '../app-intro-overlay/AppIntroOverlay';
import renderer from 'react-test-renderer';

describe('<AppIntroOverlay />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<AppIntroOverlay navigation={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<AppIntroOverlay navigation={{ navigate: () => { } }} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

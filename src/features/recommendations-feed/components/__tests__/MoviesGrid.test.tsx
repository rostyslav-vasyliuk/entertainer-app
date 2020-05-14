import React from 'react';
import MoviesGrid from '../MoviesGrid';
import renderer from 'react-test-renderer';

describe('<AppIntroOverlay />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<MoviesGrid navigation={{}} data={[]} label={''} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<MoviesGrid navigation={{ navigate: () => { } }} data={[]} label={''} />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<MoviesGrid navigation={{ navigate: () => { } }} data={[]} label={''} />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(2);
  });
});

import React from 'react';
import ListMoviesOfTheWeek from '../ListMoviesOfTheWeek';
import renderer from 'react-test-renderer';

describe('<AppIntroOverlay />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<ListMoviesOfTheWeek navigation={{}} data={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<ListMoviesOfTheWeek navigation={{ navigate: () => { } }} data={[]} />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<ListMoviesOfTheWeek navigation={{ navigate: () => { } }} data={[]} />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(0);
  });
});

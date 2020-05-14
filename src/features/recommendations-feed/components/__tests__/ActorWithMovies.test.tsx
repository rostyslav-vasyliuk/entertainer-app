import React from 'react';
import ActorWithMovies from '../ActorWithMovies';
import renderer from 'react-test-renderer';

describe('<AppIntroOverlay />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<ActorWithMovies navigation={{}} data={{ data: [], actor: { credits: { cast: [] } } }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<ActorWithMovies navigation={{ navigate: () => { } }} data={{ data: [], actor: { credits: { cast: [] } } }} />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<ActorWithMovies navigation={{ navigate: () => { } }} data={{ data: [], actor: { credits: { cast: [] } } }} />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(2);
  });
});

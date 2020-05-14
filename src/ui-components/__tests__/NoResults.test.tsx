import React from 'react';
import NoResults from '../NoResults/NoResults';
import renderer from 'react-test-renderer';

describe('<NoResults />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<NoResults />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<NoResults />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(3);
  });

  it('rendered', () => {
    const tree = renderer.create(<NoResults />).toJSON();
    expect(tree.children).toBeTruthy();
  });

  it('to match snapshot', () => {
    const tree = renderer.create(<NoResults />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

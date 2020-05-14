import React from 'react';
import AttentionCard from '../card/AttentionCard';
import renderer from 'react-test-renderer';

describe('<AttentionCard />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<AttentionCard />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<AttentionCard />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(2);
  });

  it('rendered', () => {
    const tree = renderer.create(<AttentionCard />).toJSON();
    expect(tree.children).toBeTruthy();
  });

  it('to match snapshot', () => {
    const tree = renderer.create(<AttentionCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

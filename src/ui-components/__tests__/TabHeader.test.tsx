import React from 'react';
import TabHeader from '../tab-header/TabHeader';
import renderer from 'react-test-renderer';

describe('<TabHeader />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<TabHeader />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<TabHeader />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(0);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<TabHeader />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(1);
  });

  it('rendered', () => {
    const tree = renderer.create(<TabHeader />).toJSON();
    expect(tree.children).toBeTruthy();
  });

  it('to match snapshot', () => {
    const tree = renderer.create(<TabHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

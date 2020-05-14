import React from 'react';
import Header from '../Header/Header';
import renderer from 'react-test-renderer';

describe('<Header />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children.length).toBeGreaterThanOrEqual(1);
  });

  it('rendered', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children).toBeTruthy();
  });

  it('to match snapshot', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

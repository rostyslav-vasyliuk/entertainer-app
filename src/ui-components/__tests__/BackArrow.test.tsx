import React from 'react';
import BackArrow from '../BackArrow/BackArrow';
import renderer from 'react-test-renderer';

describe('<BackArrow />', () => {
  it('has null child', () => {
    const tree = renderer.create(<BackArrow />).toJSON();
    expect(tree.children).toBe(null);
  });

  it('rendered', () => {
    const tree = renderer.create(<BackArrow />).toJSON();
    expect(tree.children).toBeFalsy();
  });

  it('to match snapshot', () => {
    const tree = renderer.create(<BackArrow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import LogoutModal from '../LogoutModal';
import renderer from 'react-test-renderer';

describe('<LogoutModal />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<LogoutModal navigation={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<LogoutModal navigation={{ navigate: () => {} }} />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

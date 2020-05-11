import React from 'react';
import FeedbackSuccessModal from '../FeedbackSuccessModal';
import renderer from 'react-test-renderer';

describe('<FeedbackSuccessModal />', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<FeedbackSuccessModal navigation={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderer.create(<FeedbackSuccessModal navigation={{ navigate: () => {} }} />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

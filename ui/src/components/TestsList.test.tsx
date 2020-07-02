import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TestsList } from '../components/TestsList';
import { mockTests } from '../fixtures/tests';

const defaultProps = {
  slotId: 'mpu',
  workingTests: [...mockTests],
  savedTests: [...mockTests],
  testErrors: {},
  selectedTestId: 'test1',
};

describe('TestsList', () => {
  it('should render a list of items', () => {
    const { getByRole } = render(
      <Router>
        <TestsList {...defaultProps} />
      </Router>,
    );

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    const { getAllByRole } = render(
      <Router>
        <TestsList {...defaultProps} />
      </Router>,
    );

    const items = getAllByRole('listitem');
    expect(items.length).toBe(2);
  });

  it('should render a placeholder when no items', () => {
    const { getByText } = render(
      <Router>
        <TestsList {...defaultProps} workingTests={[]} />
      </Router>,
    );

    const placeholder = getByText('No tests to display');
    expect(placeholder).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TestsItem } from '../components/TestsItem';
import { mockTests } from '../fixtures/tests';

const defaultProps = {
  id: 'test1',
  name: 'Test1',
  description: 'Description for Test 1',
  link: '/slots/mpu/tests/test1',
  isEnabled: true,
  isSelected: true,
  isModified: true,
  isLastItem: false,
  isInvalid: false,
};

describe('TestsItem', () => {
  it('should render a test name and description', () => {
    const { getByText } = render(
      <Router>
        <TestsItem {...defaultProps} isModified={true} />
      </Router>,
    );

    const name = getByText('Test1');
    expect(name).toBeInTheDocument();

    const description = getByText('Description for Test 1');
    expect(description).toBeInTheDocument();
  });

  it('should render a link to the test', () => {
    const { container } = render(
      <Router>
        <TestsItem {...defaultProps} />
      </Router>,
    );

    const link = container.querySelectorAll(`a[href='${defaultProps.link}']`);
    expect(link.length).toBe(1);
  });

  it('should render a modified label', () => {
    const { getByText } = render(
      <Router>
        <TestsItem {...defaultProps} isModified={true} />
      </Router>,
    );

    const label = getByText('(Modified)');
    expect(label).toBeInTheDocument();
  });

  it('should render a status label', () => {
    const { getByText } = render(
      <Router>
        <TestsItem {...defaultProps} isEnabled={false} />
      </Router>,
    );

    const label = getByText('Inactive');
    expect(label).toBeInTheDocument();
  });
});

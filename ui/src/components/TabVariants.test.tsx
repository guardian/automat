import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TabVariants } from '../components/TabVariants';
import { Test, Variant, TestErrors } from '../types';
import { mockTests } from '../fixtures/tests';
import { mockVariants } from '../fixtures/variants';

const defaultProps = {
  test: { ...mockTests[0] } as Test,
  variants: [...mockVariants] as Variant[],
  isEditing: false,
  onTestUpdated: () => {},
  testErrors: {} as TestErrors,
};

describe('TabVariants', () => {
  it('should render a list of variants in the test', () => {
    const { getByRole } = render(
      <Router>
        <TabVariants {...defaultProps} />
      </Router>,
    );

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    const { getAllByRole } = render(
      <Router>
        <TabVariants {...defaultProps} />
      </Router>,
    );

    const items = getAllByRole('listitem');
    expect(items.length).toBe(2);
  });

  it('should render an error message when provided', () => {
    const testErrors: TestErrors = { [defaultProps.test.id]: { variants: 'You need one at least one variant' } };

    const { getByText } = render(
      <Router>
        <TabVariants {...defaultProps} testErrors={testErrors} />
      </Router>,
    );

    const error = getByText('You need one at least one variant');
    expect(error).toBeInTheDocument();
  });

  it('should render a Variants dialog when button Add Variant is clicked', async () => {
    const { getByText } = render(
      <Router>
        <TabVariants {...defaultProps} isEditing={true} />
      </Router>,
    );

    fireEvent.click(getByText('Add Variant'));
    expect(getByText('Select Component')).toBeInTheDocument();
  });
});

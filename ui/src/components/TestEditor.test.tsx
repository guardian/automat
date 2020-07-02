import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TestEditor } from './TestEditor';
import { TestErrors } from '../types';
import { mockTests } from '../fixtures/tests';
import { mockVariants } from '../fixtures/variants';
import { mockFilters } from '../fixtures/filters';

const defaultProps = {
  name: 'Example test',
  testErrors: {} as TestErrors,
  workingTest: { ...mockTests[0] },
  variants: [...mockVariants],
  filters: [...mockFilters],
  isEditing: false,
  onTestUpdated: jest.fn(),
  onTestDeleted: jest.fn(),
};

describe('TestEditor', () => {
  it('should render Basic tab as default', () => {
    const { getByLabelText } = render(<TestEditor {...defaultProps} />);

    const tab = getByLabelText('Basic tab');
    expect(tab).toBeInTheDocument();
  });

  it('should be able to switch to Variants tab', () => {
    const { getByLabelText, getByText } = render(<TestEditor {...defaultProps} />);

    const variantsButton = getByText('Variants');
    fireEvent.click(variantsButton, { bubbles: true });
    expect(getByLabelText('Variants tab')).toBeInTheDocument();
  });

  it('should be able to switch to Filters tab', () => {
    const { getByLabelText, getByText } = render(<TestEditor {...defaultProps} />);

    const variantsButton = getByText('Filters');
    fireEvent.click(variantsButton, { bubbles: true });
    expect(getByLabelText('Filters tab')).toBeInTheDocument();
  });
});

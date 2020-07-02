import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterSelector } from '../components/FilterSelector';
import { mockFilters } from '../fixtures/filters';

const defaultProps = {
  value: 'authstatus',
  filters: [...mockFilters],
  onSelect: jest.fn(),
  onCancel: jest.fn(),
};

describe('VariantSelector', () => {
  it('should render a list of variants in the test', () => {
    const { getByRole } = render(<FilterSelector {...defaultProps} />);

    const list = getByRole('listbox');
    expect(list).toBeInTheDocument();
  });

  it('should render a MUI select to choose variants', () => {
    const { getByLabelText } = render(<FilterSelector {...defaultProps} />);

    const button = getByLabelText('Click to select filter');
    expect(button).toBeInTheDocument();
  });

  it('should pre-select the current value', () => {
    const { getByText } = render(<FilterSelector {...defaultProps} value="subspropensity" />);

    const name = getByText('Propensity to Subscribe');
    expect(name).toBeInTheDocument();
    const description = getByText('Narrow the test audience based on the propensity of the user to subscribe');
    expect(description).toBeInTheDocument();
  });

  it('should call the success handler correctly', () => {
    const onSelect = jest.fn();

    const { getByLabelText } = render(<FilterSelector {...defaultProps} onSelect={onSelect} />);

    fireEvent.click(getByLabelText('Select'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('should call the error handler correctly', () => {
    const onCancel = jest.fn();

    const { getByLabelText } = render(<FilterSelector {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});

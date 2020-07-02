import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VariantSelector } from '../components/VariantSelector';
import { mockVariants } from '../fixtures/variants';

const defaultProps = {
  value: 'subsbanner',
  variants: [...mockVariants],
  onSelect: jest.fn(),
  onCancel: jest.fn(),
};

describe('VariantSelector', () => {
  it('should render a list of variants in the test', () => {
    const { getByRole } = render(<VariantSelector {...defaultProps} />);

    const list = getByRole('listbox');
    expect(list).toBeInTheDocument();
  });

  it('should render a MUI select to choose variants', () => {
    const { getByLabelText } = render(<VariantSelector {...defaultProps} />);

    const button = getByLabelText('Click to select component');
    expect(button).toBeInTheDocument();
  });

  it('should pre-select the current value', () => {
    const { getByText } = render(<VariantSelector {...defaultProps} value="contributionsepic" />);

    const name = getByText('Contributions Epic');
    expect(name).toBeInTheDocument();
    const description = getByText('A Guardian contributions ask in epic format');
    expect(description).toBeInTheDocument();
  });

  it('should call the success handler correctly', () => {
    const onSelect = jest.fn();

    const { getByLabelText } = render(<VariantSelector {...defaultProps} onSelect={onSelect} />);

    fireEvent.click(getByLabelText('Select'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('should call the error handler correctly', () => {
    const onCancel = jest.fn();

    const { getByLabelText } = render(<VariantSelector {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});

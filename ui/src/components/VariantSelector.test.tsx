import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
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
    const { getByRole } = render(
      <Router>
        <VariantSelector {...defaultProps} />
      </Router>,
    );

    const list = getByRole('listbox');
    expect(list).toBeInTheDocument();
  });

  it('should render a MUI select to choose variants', async () => {
    const { getByLabelText } = render(
      <Router>
        <VariantSelector {...defaultProps} />
      </Router>,
    );

    const button = getByLabelText('Click to select component');
    expect(button).toBeInTheDocument();
  });

  it('should pre-select the current value', async () => {
    const { getByText } = render(
      <Router>
        <VariantSelector {...defaultProps} value="contributionsepic" />
      </Router>,
    );

    const name = getByText('Contributions Epic');
    expect(name).toBeInTheDocument();
    const description = getByText('A Guardian contributions ask in epic format');
    expect(description).toBeInTheDocument();
  });

  it('should call the success handler correctly', async () => {
    const { getByLabelText } = render(
      <Router>
        <VariantSelector {...defaultProps} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Select'));
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });

  it('should call the error handler correctly', async () => {
    const { getByLabelText } = render(
      <Router>
        <VariantSelector {...defaultProps} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});

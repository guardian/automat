import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
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
    const { getByRole } = render(
      <Router>
        <FilterSelector {...defaultProps} />
      </Router>,
    );

    const list = getByRole('listbox');
    expect(list).toBeInTheDocument();
  });

  it('should render a MUI select to choose variants', async () => {
    const { getByLabelText } = render(
      <Router>
        <FilterSelector {...defaultProps} />
      </Router>,
    );

    const button = getByLabelText('Click to select filter');
    expect(button).toBeInTheDocument();
  });

  it('should pre-select the current value', async () => {
    const { getByText } = render(
      <Router>
        <FilterSelector {...defaultProps} value="subspropensity" />
      </Router>,
    );

    const name = getByText('Propensity to Subscribe');
    expect(name).toBeInTheDocument();
    const description = getByText('Narrow the test audience based on the propensity of the user to subscribe');
    expect(description).toBeInTheDocument();
  });

  it('should call the success handler correctly', async () => {
    const { getByLabelText } = render(
      <Router>
        <FilterSelector {...defaultProps} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Select'));
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });

  it('should call the error handler correctly', async () => {
    const { getByLabelText } = render(
      <Router>
        <FilterSelector {...defaultProps} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});

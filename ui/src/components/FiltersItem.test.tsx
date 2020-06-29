import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FiltersItem } from '../components/FiltersItem';
import { mockTests } from '../fixtures/tests';
import { mockFilters } from '../fixtures/filters';

const defaultProps = {
  index: 0,
  filter: { ...mockFilters[0] },
  isEditing: false,
  onFilterDeleted: jest.fn(),
  onFilterUpdated: jest.fn(),
};

describe('FiltersItem', () => {
  it('should render a filter name and description', () => {
    const { getByText } = render(
      <Router>
        <FiltersItem {...defaultProps} />
      </Router>,
    );

    const name = getByText('Authentication Status');
    expect(name).toBeInTheDocument();

    const description = getByText('Narrow the test audience based on the authentication status of the user');
    expect(description).toBeInTheDocument();
  });

  it('should render a clickable Delete button', () => {
    const { getAllByRole } = render(
      <Router>
        <FiltersItem {...defaultProps} />
      </Router>,
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(1);
  });

  it('should render a Confirmation dialog and call the appropriate handler', async () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <FiltersItem {...defaultProps} isEditing={true} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Delete Filter'));
    expect(getByText('Delete filter?')).toBeInTheDocument();

    fireEvent.click(getByLabelText('Confirm delete Filter'));
    expect(defaultProps.onFilterDeleted).toHaveBeenCalled();
  });
});

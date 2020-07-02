import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TabFilters } from '../components/TabFilters';
import { Test, Filter } from '../types';
import { mockTests } from '../fixtures/tests';
import { mockFilters } from '../fixtures/filters';

const defaultProps = {
  test: { ...mockTests[0] } as Test,
  filters: [...mockFilters] as Filter[],
  isEditing: false,
  onTestUpdated: () => {},
};

describe('TabFilters', () => {
  it('should render a list of filters in the test', () => {
    const { getByRole } = render(<TabFilters {...defaultProps} />);

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    const { getAllByRole } = render(<TabFilters {...defaultProps} />);

    const items = getAllByRole('listitem');
    expect(items.length).toBe(2);
  });

  it('should render a Filters dialog when button Add Filter is clicked', () => {
    const { getByText } = render(<TabFilters {...defaultProps} isEditing={true} />);

    fireEvent.click(getByText('Add Filter'));
    expect(getByText('Select Filter')).toBeInTheDocument();
  });
});

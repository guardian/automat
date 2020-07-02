import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SlotsList } from '../components/SlotsList';
import { mockSlots } from '../fixtures/slots';

describe('SlotsList', () => {
  it('should render a list of items', () => {
    const { getByRole } = render(
      <Router>
        <SlotsList slots={mockSlots} />
      </Router>,
    );

    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    const { getAllByRole } = render(
      <Router>
        <SlotsList slots={mockSlots} />
      </Router>,
    );

    const items = getAllByRole('listitem');
    expect(items.length).toBe(3);
  });
});

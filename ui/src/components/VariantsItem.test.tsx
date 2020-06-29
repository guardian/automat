import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { VariantsItem } from '../components/VariantsItem';
import { mockVariants } from '../fixtures/variants';

const defaultProps = {
  index: 0,
  variant: { ...mockVariants[0] },
  variants: [...mockVariants],
  isEditing: false,
  onVariantDeleted: jest.fn(),
  onVariantUpdated: jest.fn(),
};

describe('VariantsItem', () => {
  it('should render a variant name and description', () => {
    const { getByText } = render(
      <Router>
        <VariantsItem {...defaultProps} />
      </Router>,
    );

    const name = getByText('Subscriptions Banner');
    expect(name).toBeInTheDocument();

    const description = getByText('A Guardian subscriptions advert in banner format');
    expect(description).toBeInTheDocument();
  });

  it('should render two buttons', () => {
    const { getAllByRole } = render(
      <Router>
        <VariantsItem {...defaultProps} />
      </Router>,
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('should render a Confirmation dialog and call the appropriate handler', async () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <VariantsItem {...defaultProps} isEditing={true} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Delete Variant'));
    expect(getByText('Delete variant?')).toBeInTheDocument();

    fireEvent.click(getByLabelText('Confirm delete Variant'));
    expect(defaultProps.onVariantDeleted).toHaveBeenCalled();
  });

  it('should render a Variants dialog when Update button is clicked', async () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <VariantsItem {...defaultProps} isEditing={true} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Update Variant'));
    expect(getByText('Select Component')).toBeInTheDocument();
  });
});

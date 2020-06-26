import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { VariantsItem } from '../components/VariantsItem';
import { Test, Variant, TestErrors } from '../types';
import { mockTests } from '../fixtures/tests';
import { mockVariants } from '../fixtures/variants';

// useEffect(() => {
//   const derivedVariants = test.variants.map((dV) => variants.find((v) => dV === v.id)).filter((dV) => dV);
//   setDerivedVariants(derivedVariants as Variant[]);
// }, [test, variants]);

const defaultProps = {
  index: 0,
  variant: { ...mockVariants[0] },
  variants: [...mockVariants],
  isEditing: false,
  onVariantDeleted: () => {},
  onVariantUpdated: () => {},
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

  it('should render a Confirmation dialog when Delete button is clicked', async () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <VariantsItem {...defaultProps} isEditing={true} />
      </Router>,
    );

    fireEvent.click(getByLabelText('Delete Variant'));
    expect(getByText('Delete variant?')).toBeInTheDocument();
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

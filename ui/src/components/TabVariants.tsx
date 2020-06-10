import React from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import { Test, Variant } from '../types';
import { VariantSelector } from './VariantSelector';

const rootStyles = css``;

const variantSelectorStyles = css``;

type Props = {
  test: Test;
  variants: Variant[];
  isEditing: boolean;
  onTestUpdated: Function;
};

export const TabVariants = ({ test, variants, isEditing, onTestUpdated }: Props) => {
  const derivedVariants = test.variants.map((derivedVariant) => {
    return variants.find((v) => derivedVariant === v.id);
  });

  return (
    <div className={rootStyles}>
      <section className={variantSelectorStyles}>
        {derivedVariants.map((variant, index) => {
          if (variant) {
            return <VariantSelector index={index} variant={variant} onChange={() => {}} isEditing={isEditing} />;
          }
        })}
      </section>
      <Button disabled={!isEditing} startIcon={<AddCircleOutlineIcon />} color="primary" variant="contained" onClick={() => {}}>
        Add Variant
      </Button>
    </div>
  );
};

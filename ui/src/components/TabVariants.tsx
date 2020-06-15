import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import { Test, Variant } from '../types';
import { VariantSelector } from './VariantSelector';
import { VariantsItem } from './VariantsItem';

const rootStyles = css``;

type Props = {
  test: Test;
  variants: Variant[];
  isEditing: boolean;
  onTestUpdated: Function;
};

export const TabVariants = ({ test, variants, isEditing, onTestUpdated }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [derivedVariants, setDerivedVariants] = useState([] as Variant[]);

  useEffect(() => {
    const derivedVariants = test.variants.map((dV) => variants.find((v) => dV === v.id)).filter((dV) => dV);
    setDerivedVariants(derivedVariants as Variant[]);
  }, [test, variants]);

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = test.variants.filter((variant, index) => variantIndex !== index);
    onTestUpdated({ ...test, variants: updatedVariants });
  };

  const handleUpdateVariant = (variantIndex: number, variantId: string) => {
    const updatedVariants = test.variants.map((variant, index) => (variantIndex === index ? variantId : variant));
    onTestUpdated({ ...test, variants: updatedVariants });
  };

  const handleAddVariant = (variantId: string) => {
    if (variantId) {
      onTestUpdated({ ...test, variants: [...test.variants, variantId] });
    }
    setIsAdding(false);
  };

  return (
    <div className={rootStyles}>
      {derivedVariants.map((derivedVariant, index) => (
        <VariantsItem
          key={`${derivedVariant.id}-${index}`}
          index={index}
          variant={derivedVariant}
          variants={variants}
          onVariantDeleted={handleDeleteVariant}
          onVariantUpdated={handleUpdateVariant}
          isEditing={isEditing}
        />
      ))}
      {isAdding && <VariantSelector variants={variants} onCancel={() => setIsAdding(false)} onSelect={handleAddVariant} />}
      <Button disabled={!isEditing} startIcon={<AddCircleOutlineIcon />} color="primary" variant="contained" onClick={() => setIsAdding(true)}>
        Add Variant
      </Button>
    </div>
  );
};

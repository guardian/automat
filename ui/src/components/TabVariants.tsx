import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon, Error as ErrorIcon } from '@material-ui/icons';
import { Test, Variant, TestErrors } from '../types';
import { VariantSelector } from './VariantSelector';
import { VariantsItem } from './VariantsItem';
import { FieldMessage } from './FieldMessage';

const rootStyles = css``;

const fieldMessageWrapperStyles = css`
  margin-bottom: 16px;
`;

type Props = {
  test: Test;
  variants: Variant[];
  isEditing: boolean;
  onTestUpdated: Function;
  testErrors: TestErrors;
};

export const TabVariants = ({ test, variants, isEditing, onTestUpdated, testErrors }: Props) => {
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

  const errors = testErrors[test.id] || undefined;

  return (
    <div className={rootStyles}>
      {errors && errors.variants ? (
        <div className={fieldMessageWrapperStyles}>
          <FieldMessage severity="error">
            <span>{errors.variants}</span>
          </FieldMessage>
        </div>
      ) : (
        derivedVariants.map((derivedVariant, index) => (
          <VariantsItem
            key={`${derivedVariant.id}-${index}`}
            index={index}
            variant={derivedVariant}
            variants={variants}
            onVariantDeleted={handleDeleteVariant}
            onVariantUpdated={handleUpdateVariant}
            isEditing={isEditing}
          />
        ))
      )}
      {isAdding && <VariantSelector variants={variants} onCancel={() => setIsAdding(false)} onSelect={handleAddVariant} />}
      <Button disabled={!isEditing} startIcon={<AddCircleOutlineIcon />} color="primary" variant="contained" onClick={() => setIsAdding(true)}>
        Add Variant
      </Button>
    </div>
  );
};

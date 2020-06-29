import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, Grid, Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Settings as SettingsIcon } from '@material-ui/icons';
import { Heading } from './Heading';
import { Confirmation } from './Confirmation';
import { VariantSelector } from './VariantSelector';
import { Variant } from '../types';
import { colors } from '../utils/theme';
import { alphabet } from '../utils/alphabet';

const rootStyles = css`
  width: 100%;
  background-color: ${colors.lighterGrey};
  border: 1px solid ${colors.darkerGrey};
  padding: 12px 0 12px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const gridStyles = css`
  width: 100%;
`;

const indexStyles = css`
  font-size: 48px;
  line-height: 48px;
  padding: 0;
  text-align: center;
  margin: 0;
`;

const noMargin = css`
  margin: 0;
`;

const buttonStyles = css`
  border: 1px solid ${colors.darkerGrey};
`;

type Props = {
  index: number;
  variant: Variant;
  variants: Variant[];
  isEditing: boolean;
  onVariantDeleted: Function;
  onVariantUpdated: Function;
};

export const VariantsItem = ({ index, variant, variants, isEditing, onVariantDeleted, onVariantUpdated }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleUpdateVariant = (variantId: string) => {
    onVariantUpdated(index, variantId);
    setIsUpdating(false);
  };

  return (
    <Card elevation={0} className={rootStyles} role="listitem">
      <Grid container spacing={2} justify="flex-start" alignItems="center" className={cx(gridStyles)}>
        <Grid item xs={1}>
          <p className={indexStyles}>{alphabet[index]}</p>
        </Grid>
        <Grid item xs={9}>
          <Heading level={2} supressMargin>
            {variant.name}
          </Heading>
          <p className={noMargin}>{variant.description}</p>
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled={!isEditing} onClick={() => setIsUpdating(true)} className={buttonStyles} aria-label="Update Variant">
            <SettingsIcon />
          </IconButton>
          {isUpdating && <VariantSelector value={variant.id} variants={variants} onCancel={() => setIsUpdating(false)} onSelect={handleUpdateVariant} />}
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled={!isEditing} onClick={() => setDeleteConfirmation(true)} className={buttonStyles} aria-label="Delete Variant">
            <DeleteIcon />
          </IconButton>
          {deleteConfirmation && (
            <Confirmation
              title="Delete variant?"
              message="Are you sure you want to delete this variant?"
              buttons={
                <>
                  <Button onClick={() => setDeleteConfirmation(false)} variant="contained">
                    Cancel
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      onVariantDeleted(index);
                      setDeleteConfirmation(false);
                    }}
                    variant="contained"
                    color="secondary"
                    aria-label="Confirm delete Variant"
                  >
                    Delete Variant
                  </Button>
                </>
              }
            />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

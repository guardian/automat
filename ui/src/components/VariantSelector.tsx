import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { Variant } from '../types';
import { colors } from '../utils/theme';

const dialogStyles = css`
  width: 500px;
`;

const helperStyles = css`
  margin: 0 0 12px 0;
`;

const selectStyles = css`
  width: 100%;
`;

const itemRowStyles = css`
  border-top: 1px solid ${colors.lighterGrey};
  border-bottom: 1px solid ${colors.lighterGrey};
`;

const itemContentStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const nameStyles = css`
  font-weight: bold;
  margin: 0;
`;

const descriptionStyles = css`
  margin: 0;
`;

type Props = {
  value?: string;
  variants: Variant[];
  onSelect: Function;
  onCancel: Function;
};

export const VariantSelector = ({ value = '', variants, onSelect, onCancel }: Props) => {
  const [selectedVariantId, setSelectedVariantId] = useState(value);

  const handleChange = (event: any) => {
    const variantId = event.target.value;
    if (variantId) {
      setSelectedVariantId(variantId);
    }
  };

  const isUpdating = !!value;

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
      <DialogTitle>Select Component</DialogTitle>
      <DialogContent className={cx(dialogStyles)}>
        <p className={helperStyles}>
          Users seeing this variant will be presented the <b>Component</b> you select below. You can change this at any time, but doing so may affect the test
          results.
        </p>
        <Select
          value={selectedVariantId}
          onChange={handleChange}
          className={selectStyles}
          variant="outlined"
          role="listbox"
          SelectDisplayProps={{ 'aria-label': 'Click to select component' }}
        >
          {variants.map((variant) => (
            <MenuItem key={variant.id} value={variant.id} className={itemRowStyles}>
              <div className={itemContentStyles}>
                <p className={nameStyles}>{variant.name}</p>
                <p className={descriptionStyles}>{variant.description}</p>
              </div>
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()} variant="contained" aria-label="Cancel">
          Cancel
        </Button>
        {isUpdating ? (
          <Button
            disabled={!selectedVariantId}
            startIcon={<CheckCircleIcon />}
            color="primary"
            variant="contained"
            onClick={() => onSelect(selectedVariantId)}
            aria-label="Select"
          >
            Update Variant
          </Button>
        ) : (
          <Button
            disabled={!selectedVariantId}
            startIcon={<AddCircleOutlineIcon />}
            color="primary"
            variant="contained"
            onClick={() => onSelect(selectedVariantId)}
            aria-label="Select"
          >
            Add Variant
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

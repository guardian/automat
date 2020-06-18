import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { Filter } from '../types';
import { colors } from '../utils/theme';

const rootStyles = css``;

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
  filters: Filter[];
  onSelect: Function;
  onCancel: Function;
};

export const FilterSelector = ({ value = '', filters, onSelect, onCancel }: Props) => {
  const [selectedFilterId, setSelectedFilterId] = useState(value);

  const handleChange = (event: any) => {
    const filterId = event.target.value;
    if (filterId) {
      setSelectedFilterId(filterId);
    }
  };

  const isUpdating = !!value;

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={true} className={cx(rootStyles)}>
      <DialogTitle>Select Filter</DialogTitle>
      <DialogContent className={cx(dialogStyles)}>
        <p className={helperStyles}>
          Filters can be used to narrow the <b>Audience</b> of your test. You can change these at any time, but doing so may affect the test results.
        </p>
        <Select value={selectedFilterId} onChange={handleChange} className={selectStyles} variant="outlined">
          {filters.map((filter) => (
            <MenuItem key={filter.id} value={filter.id} className={itemRowStyles}>
              <div className={itemContentStyles}>
                <p className={nameStyles}>{filter.name}</p>
                <p className={descriptionStyles}>{filter.helpText}</p>
              </div>
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()} variant="contained">
          Cancel
        </Button>
        {isUpdating ? (
          <Button disabled={!selectedFilterId} startIcon={<CheckCircleIcon />} color="primary" variant="contained" onClick={() => onSelect(selectedFilterId)}>
            Update Filter
          </Button>
        ) : (
          <Button
            disabled={!selectedFilterId}
            startIcon={<AddCircleOutlineIcon />}
            color="primary"
            variant="contained"
            onClick={() => onSelect(selectedFilterId)}
          >
            Add Filter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

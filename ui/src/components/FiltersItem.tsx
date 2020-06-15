import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Card, Grid, Button, IconButton } from '@material-ui/core';
import { FilterList as FilterListIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Heading } from './Heading';
import { Confirmation } from './Confirmation';
import { colors } from '../utils/theme';
import { Filter } from '../types';
import { FilterConfig } from './FilterConfig';

const rootStyles = css`
  width: 100%;
  background-color: ${colors.lighterGrey};
  border: 1px solid ${colors.darkerGrey};
  padding: 12px 0 12px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const gridStyles = css`
  width: 100%;
`;

const iconStyles = css`
  font-size: 47px;
  line-height: 47px;
  text-align: center;
  margin: 0;
`;

const noMargin = css`
  margin: 0;
`;

const buttonStyles = css`
  border: 1px solid ${colors.darkerGrey};
`;

const optionsWrapperStyles = css`
  padding: 12px;
  border: 1px solid red;
  border-radius: 4px;
`;

type Props = {
  index: number;
  filter: Filter;
  isEditing: boolean;
  onFilterUpdated: Function;
  onFilterDeleted: Function;
};

export const FiltersItem = ({ index, filter, isEditing, onFilterUpdated, onFilterDeleted }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleUpdateFilter = (selectedOptionIds: string[]) => {
    onFilterUpdated(index, selectedOptionIds);
  };

  return (
    <Card elevation={0} className={rootStyles}>
      <Grid container spacing={2} justify="flex-start" alignItems="center" className={cx(gridStyles)}>
        <Grid item xs={1}>
          <FilterListIcon className={cx(iconStyles)} />
        </Grid>
        <Grid item xs={10}>
          <Heading level={2} supressMargin>
            {filter.name}
          </Heading>
          <p className={noMargin}>{filter.helpText}</p>
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled={!isEditing} onClick={() => setDeleteConfirmation(true)} className={buttonStyles}>
            <DeleteIcon />
          </IconButton>
          {deleteConfirmation && (
            <Confirmation
              title="Delete filter?"
              message="Are you sure you want to delete this filter?"
              buttons={
                <>
                  <Button onClick={() => setDeleteConfirmation(false)} variant="contained">
                    Cancel
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      onFilterDeleted(index);
                      setDeleteConfirmation(false);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Delete Filter
                  </Button>
                </>
              }
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FilterConfig
            selectedOptionIds={filter.selectedOptionIds || []}
            options={filter.options}
            allowMultipe={filter.allowMultiple}
            isEditing={isEditing}
            onFilterUpdated={handleUpdateFilter}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

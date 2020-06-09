import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Button, Grid } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Confirmation } from './Confirmation';
import { colors } from '../utils/theme';
import { Test } from '../types';

const rootStyles = css``;

const createdByStyles = css`
  font-size: 12px;
  color: ${colors.darkerGrey};
`;

type Props = {
  test: Test;
  isEditing: boolean;
  onTestDeleted: Function;
};

export const EditorFooter = ({ test, isEditing, onTestDeleted }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { id, name, created, author } = test;

  const formattedDate = new Date(created).toLocaleString().replace(', ', ' at ');
  let createdSentence = `Test created on ${formattedDate}`;
  if (author && author.firstName && author.lastName) {
    createdSentence += ` by ${author.firstName} ${author.lastName}`;
  }

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center" className={cx(rootStyles)}>
      <Grid item>
        <p className={createdByStyles}>{createdSentence}</p>
      </Grid>
      <Grid item>
        <Button disabled={!isEditing} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => setDeleteConfirmation(true)}>
          Delete Test
        </Button>
        {deleteConfirmation && (
          <Confirmation
            title={`Delete '${name}'?`}
            message="Are you sure you want to delete this test?"
            buttons={
              <>
                <Button onClick={() => setDeleteConfirmation(false)} variant="contained">
                  Cancel
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    onTestDeleted(id);
                    setDeleteConfirmation(false);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Delete Test
                </Button>
              </>
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

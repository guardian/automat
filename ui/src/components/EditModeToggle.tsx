import React from 'react';
import { css, cx } from 'emotion';
import { Grid, Chip, Paper, Button } from '@material-ui/core';
import { Close as CloseIcon, LockOpen as LockOpenIcon, Lock as LockIcon } from '@material-ui/icons';

const getRootStyles = (isEditing: boolean) => css`
  width: 100%;
  padding: 12px;
  background-color: ${isEditing ? '#fff59d' : 'white'};
`;

const statusStyles = css`
  font-weight: bold;
`;

const infoTextStyles = css`
  margin: 0;
`;

type Props = {
  isEditing: boolean;
  onStatusChanged: Function;
  onSave: Function;
  onCancel: Function;
};

export const EditModeToggle = ({ isEditing = false, onStatusChanged, onSave, onCancel }: Props) => {
  return (
    <Paper className={cx(getRootStyles(isEditing))}>
      {isEditing ? (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <p className={infoTextStyles}>
              You're in <Chip className={statusStyles} label="EDITING" /> mode. Your changes will be published as soon as you click{' '}
              <span className={statusStyles}>Save &amp; Lock</span>.
            </p>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button startIcon={<CloseIcon />} color="primary" variant="contained" onClick={() => onCancel()}>
                  Discard
                </Button>
              </Grid>
              <Grid item>
                <Button startIcon={<LockIcon />} color="primary" variant="contained" onClick={() => onSave()}>
                  Save &amp; Lock
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <p className={infoTextStyles}>
              You're in <Chip className={statusStyles} label="READ ONLY" /> mode. Click the <span className={statusStyles}>Unlock</span> button to make changes.
            </p>
          </Grid>
          <Grid item>
            <Button startIcon={<LockOpenIcon />} color="primary" variant="contained" onClick={() => onStatusChanged(!isEditing)}>
              Unlock
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

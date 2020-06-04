import React from 'react';
import { css, cx } from 'emotion';
import { Grid, Chip, Paper, Button } from '@material-ui/core';
import { LockOpen as LockOpenIcon, Backup as BackupIcon, SettingsBackupRestore as RevertIcon } from '@material-ui/icons';

const getRootStyles = (isEditing: boolean) => css`
  width: 100%;
  padding: 12px;
  border: 5px solid ${isEditing ? '#FFF59D' : 'white'};
`;

const statusStyles = css`
  font-weight: bold;
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
            <div>
              You're in <Chip className={statusStyles} label="EDITING" /> mode. Your changes will be published as soon as you click{' '}
              <span className={statusStyles}>Save &amp; Lock</span>.
            </div>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button startIcon={<RevertIcon />} color="primary" variant="contained" onClick={() => onCancel()}>
                  Discard
                </Button>
              </Grid>
              <Grid item>
                <Button startIcon={<BackupIcon />} color="primary" variant="contained" onClick={() => onSave()}>
                  Save All
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <div>
              You're in <Chip className={statusStyles} label="READ ONLY" /> mode. Click the <span className={statusStyles}>Unlock</span> button to make changes.
            </div>
          </Grid>
          <Grid item>
            <Button startIcon={<LockOpenIcon />} color="primary" variant="contained" onClick={() => onStatusChanged(!isEditing)}>
              Unlock Editing Mode
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Grid, Chip, Paper, Button } from '@material-ui/core';
import { LockOpen as LockOpenIcon, Backup as BackupIcon, SettingsBackupRestore as RevertIcon } from '@material-ui/icons';
import { Confirmation } from './Confirmation';

const getRootStyles = (isEditing: boolean) => css`
  width: 100%;
  padding: 12px;
  border: 5px solid ${isEditing ? '#ffeb3b' : '#fff'};
`;

const statusStyles = css`
  font-weight: bold;
`;

type Props = {
  isEditing: boolean;
  hasChanges: boolean;
  onUnlock: Function;
  onSave: Function;
  onRevert: Function;
};

export const EditModeToggle = ({ isEditing = false, hasChanges, onUnlock, onSave, onRevert }: Props) => {
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  const [revertConfirmation, setRevertConfirmation] = useState(false);

  const handleRevertClick = () => {
    if (hasChanges) {
      setRevertConfirmation(true);
    } else {
      onRevertChanges();
    }
  };

  const handleSaveClick = () => {
    if (hasChanges) {
      setSaveConfirmation(true);
    } else {
      onSaveChanges();
    }
  };

  const onSaveChanges = () => {
    setSaveConfirmation(false);
    onSave();
  };

  const onRevertChanges = () => {
    setRevertConfirmation(false);
    onRevert();
  };

  return (
    <Paper className={cx(getRootStyles(isEditing))}>
      {isEditing ? (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            You're in <Chip className={statusStyles} label="Editing" /> mode. Make your changes and click <span className={statusStyles}>Save All</span> to
            publish.
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button startIcon={<RevertIcon />} color="primary" variant="contained" onClick={handleRevertClick}>
                  Revert
                </Button>
                {revertConfirmation && (
                  <Confirmation
                    title="Revert changes?"
                    message="Are you sure you want revert your changes?"
                    buttons={
                      <>
                        <Button onClick={() => setRevertConfirmation(false)} variant="contained">
                          Cancel
                        </Button>
                        <Button startIcon={<RevertIcon />} onClick={onRevertChanges} color="primary" variant="contained">
                          Revert
                        </Button>
                      </>
                    }
                  />
                )}
              </Grid>
              <Grid item>
                <Button startIcon={<BackupIcon />} color="primary" variant="contained" onClick={handleSaveClick}>
                  Save All
                </Button>
                {saveConfirmation && (
                  <Confirmation
                    title="Save changes?"
                    message="Are you sure you want to save and publish your changes?"
                    buttons={
                      <>
                        <Button onClick={() => setSaveConfirmation(false)} variant="contained">
                          Cancel
                        </Button>
                        <Button startIcon={<BackupIcon />} onClick={onSaveChanges} color="primary" variant="contained">
                          Save All
                        </Button>
                      </>
                    }
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            You're in <Chip className={statusStyles} label="Read Only" /> mode. Click the <span className={statusStyles}>Unlock Editing Mode</span> button to
            make changes.
          </Grid>
          <Grid item>
            <Button startIcon={<LockOpenIcon />} color="primary" variant="contained" onClick={() => onUnlock()}>
              Unlock Editing Mode
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Grid, Chip, Paper, Button } from '@material-ui/core';
import { LockOpen as LockOpenIcon, Backup as BackupIcon, SettingsBackupRestore as RevertIcon } from '@material-ui/icons';
import { Confirmation } from './Confirmation';
import { colors } from '../utils/theme';

const getRootStyles = (isEditing: boolean) => css`
  width: 100%;
  padding: 12px;
  border: 5px solid ${isEditing ? colors.yellow : colors.white};
`;

const statusStyles = css`
  font-weight: bold;
`;

type Props = {
  isEditing: boolean;
  hasChanges: boolean;
  onUnlock: Function;
  onSaveChanges: Function;
  onRevertChanges: Function;
};

export const ModeToggler = ({ isEditing = false, hasChanges, onUnlock, onSaveChanges, onRevertChanges }: Props) => {
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  const [revertConfirmation, setRevertConfirmation] = useState(false);

  const handleRevertConfirmation = () => {
    if (hasChanges) {
      setRevertConfirmation(true);
    } else {
      revertChanges();
    }
  };

  const handleSaveConfirmation = () => {
    if (hasChanges) {
      setSaveConfirmation(true);
    } else {
      saveChanges();
    }
  };

  const saveChanges = () => {
    setSaveConfirmation(false);
    onSaveChanges();
  };

  const revertChanges = () => {
    setRevertConfirmation(false);
    onRevertChanges();
  };

  return (
    <Paper className={cx(getRootStyles(isEditing))}>
      {isEditing ? (
        <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            You're in <Chip className={statusStyles} label="Editing" /> mode. Make your changes and click <b>Save All</b> to publish.
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button startIcon={<RevertIcon />} color="primary" variant="contained" onClick={handleRevertConfirmation}>
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
                        <Button startIcon={<RevertIcon />} onClick={revertChanges} color="primary" variant="contained">
                          Revert
                        </Button>
                      </>
                    }
                  />
                )}
              </Grid>
              <Grid item>
                <Button startIcon={<BackupIcon />} color="primary" variant="contained" onClick={handleSaveConfirmation}>
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
                        <Button startIcon={<BackupIcon />} onClick={saveChanges} color="primary" variant="contained">
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
            You're in <Chip className={statusStyles} label="Read Only" /> mode. Click the <b>Unlock Editing Mode</b> button to make changes.
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

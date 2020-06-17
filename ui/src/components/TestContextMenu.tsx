import React, { useState } from 'react';
import { Button, List, ListItem, ListItemIcon, ListItemText, IconButton, Popover } from '@material-ui/core';
import { Menu as MenuIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Test } from '../types';
import { Confirmation } from './Confirmation';

type Props = {
  test: Test;
  isEditing: boolean;
  onTestDeleted: Function;
};

type MenuAnchor = HTMLElement | undefined;

export const TestContextMenu = ({ test, isEditing, onTestDeleted }: Props) => {
  const [menuAnchor, setMenuAnchor] = useState(undefined as MenuAnchor);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { id, name } = test;
  return (
    <>
      <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Popover
        id="test-settings-menu"
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List dense>
          <ListItem disabled={!isEditing} button onClick={() => setDeleteConfirmation(true)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Test" />
          </ListItem>
        </List>
      </Popover>
      {deleteConfirmation && (
        <Confirmation
          title={`Delete '${name}'?`}
          message="Are you sure you want to delete this test?"
          buttons={
            <>
              <Button
                onClick={() => {
                  setDeleteConfirmation(false);
                  setMenuAnchor(undefined);
                }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => {
                  onTestDeleted(id);
                  setDeleteConfirmation(false);
                  setMenuAnchor(undefined);
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
    </>
  );
};

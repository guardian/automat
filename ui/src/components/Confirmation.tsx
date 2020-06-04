import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

type Props = {
  title?: string;
  message: string;
  buttons: JSX.Element;
};

export const Confirmation = ({ title, message, buttons }: Props) => {
  return (
    <Dialog open={true}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </Dialog>
  );
};

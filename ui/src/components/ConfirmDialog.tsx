import React from 'react';
import { css, cx } from 'emotion';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

type Props = {
  title?: string;
  message: string;
  buttons: JSX.Element;
};

const dialogStyles = css`
  width: 500px;
`;

export const ConfirmDialog = ({ title, message, buttons }: Props) => (
  <Dialog open={true}>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent className={cx(dialogStyles)}>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>{buttons}</DialogActions>
  </Dialog>
);

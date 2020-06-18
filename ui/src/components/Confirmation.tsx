import React from 'react';
import { css, cx } from 'emotion';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const dialogStyles = css`
  width: 500px;
`;

type Props = {
  title?: string;
  message: string;
  buttons: JSX.Element;
};

export const Confirmation = ({ title, message, buttons }: Props) => (
  <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent className={cx(dialogStyles)}>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>{buttons}</DialogActions>
  </Dialog>
);

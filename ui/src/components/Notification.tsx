import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  keep?: boolean;
};

export const Notification = ({ message, severity = 'info', keep = false }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const horizontal = 'right';
  const vertical = 'bottom';

  return (
    <Snackbar open={isOpen} autoHideDuration={keep ? undefined : 6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

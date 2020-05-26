import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  keep?: boolean;
};

export const FeedbackMessage = ({ message, severity = 'info', keep = false }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const horizontal = 'right';
  const vertical = 'bottom';

  return (
    <Snackbar open={open} autoHideDuration={keep ? undefined : 6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

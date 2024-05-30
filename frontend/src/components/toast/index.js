import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const Toast = ({
  message = '',
  severity = 'success',
  toastOpen = '',
  handleToastClose = () => { }
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={toastOpen}
    autoHideDuration={4000}
    onClose={handleToastClose}
  >
    <Alert onClose={handleToastClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;

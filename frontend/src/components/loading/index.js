import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props) => {
  const { paddingTop } = props;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: paddingTop || '20%',
      zIndex: -1
    }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;

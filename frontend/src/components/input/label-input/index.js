import * as React from 'react';
import TextField from '@mui/material/TextField';

import LabelInputWrapper from './style';

export default function BasicTextFields(props) {
  const {
    label,
    name,
    value,
    onChange,
    type,
    loading,
    helperText,
    error,
    required
  } = props;

  return (
    <LabelInputWrapper>
      <label>{label}</label>
      <TextField
        fullWidth
        size="small"
        id={`outlined-basic-${label}`}
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
        type={type || 'text'}
        helperText={helperText}
        error={error}
        required={required}
        disabled={loading}
        autoComplete="off"
      />
    </LabelInputWrapper>
  );
}

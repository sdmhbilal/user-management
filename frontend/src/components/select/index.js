import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { SelectWrapper } from './style';

const Select = (props) => {
  const {
    sx,
    data,
    handleChange,
    showLabel = false,
    label,
    value,
    className,
    disabled,
    isShrinked
  } = props;

  return (
    <SelectWrapper>
      <form noValidate autoComplete="off">
        <TextField
          size="small"
          select
          label={showLabel ? label : ''}
          value={value}
          onChange={handleChange}
          InputLabelProps={{ shrink: isShrinked || false }}
          margin="normal"
          variant="outlined"
          className={className}
          sx={sx}
          disabled={disabled}
        >
          {data?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </SelectWrapper>
  );
};

export default Select;

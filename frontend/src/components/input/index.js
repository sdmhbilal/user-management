import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import InputWrapper from './style';

function Input(props) {
  const {
    onChange, className, type, value, name, defaultValue, onBlur, disabled, placeholder, width, height, overflow, multiline
  } = props;
  return (
    <InputWrapper>
      <TextField
        name={name}
        size="small"
        margin="normal"
        type={type}
        value={value}
        variant="outlined"
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        onBlur={onBlur}
        disabled={disabled}
        multiline={multiline}
        sx={{ width, height, overflow }}
      />
    </InputWrapper>
  );
}
Input.propTypes = {
  handleChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  className: PropTypes.string,
};
export default Input;

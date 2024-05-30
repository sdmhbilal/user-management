import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';

import Loading from '../loading';
import ButtonWrapper from './style';

const Buttons = (props) => {
  const {
    text,
    icon,
    variant,
    onClick,
    className,
    disabled,
    type = 'button',
    loading,
    isTooltip
  } = props;

  return (
    <Stack direction="row" spacing={2}>
      {
        isTooltip
          ? (
            <Tooltip title="Refresh" placement="top">
              <ButtonWrapper>
                <Button size="small" type={type} className={className} variant={variant} startIcon={icon} onClick={onClick} disabled={disabled}>
                  {text}
                </Button>
              </ButtonWrapper>
            </Tooltip>
          )
          : (
            <ButtonWrapper>
              <Button size="small" type={type} className={className} variant={variant} startIcon={icon} onClick={onClick} disabled={disabled}>
                {text}
              </Button>
              {loading ? <Loading paddingTop="0%" /> : ''}
            </ButtonWrapper>
          )
      }
    </Stack>
  );
};

export default Buttons;

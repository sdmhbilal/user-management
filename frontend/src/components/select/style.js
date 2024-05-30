import Styled from 'styled-components';

const SelectWrapper = Styled.div`
  .MuiFormControl-root{
    margin-top:0;
    .MuiInputLabel-root,.MuiOutlinedInput-root{
      font-size:0.75em;
      top:0.25em;
      color: ${({ theme }) => theme['nevada-color']};
      font-family: ${({ theme }) => theme['font-family']};
    }
  }
  .color-change{
    label{
      color: ${({ theme }) => theme['boston-blue']}!important;
    }
    svg{
      color: ${({ theme }) => theme['boston-blue']}!important;
    }
  }
  .bg-change{
      margin-top:0;
     .MuiInputLabel-root,.MuiOutlinedInput-root{
      font-size:0.75em;
      top:0.25em;
      color: ${({ theme }) => theme['white-color']};
      font-family: ${({ theme }) => theme['font-family']};
    }
    .MuiInputBase-root{
      background-color: ${({ theme }) => theme['boston-blue']};
      border: 1px solid #175D9B;
    }
    .MuiSvgIcon-root{
      color: ${({ theme }) => theme['white-color']};
    }
  }
`;

export { SelectWrapper };

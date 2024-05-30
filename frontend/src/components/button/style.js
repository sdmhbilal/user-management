import Styled from 'styled-components';

const ButtonWrapper = Styled.div`
    width:100%;
  .MuiButton-root{
    padding:8px 20px;
    margin-top:1px;
    font-weight:600;
    font-family: ${({ theme }) => theme['font-family']};
    &.outlined-blue{
      padding:5px 15px;
    }

    &.outlined{
      border-color: ${({ theme }) => theme['button-Outlined']};
      color: ${({ theme }) => theme['outer-space']};
      min-width:100px
    }
    &.small-button{
      padding:2px 15px;
      margin-bottom:6px;
    }
    &.contained{
         background-color: ${({ theme }) => theme['primary-color']};
          color: ${({ theme }) => theme['white-color']};
          min-width:100px;
          &.Mui-disabled{
            background-color: ${({ theme }) => theme['primary-color']}50;
            cursor: no-drop;
          }
          &.w-200{
            min-width:200px;
          }
          &.w-150{
            min-width:150px;
          }
          &.w-170{
            min-width:170px;
          }
          &.w-100{
            width:100%
          }
    }
      &.modal-contained{
        background-color: ${({ theme }) => theme['cobalt-color']};
        color: ${({ theme }) => theme['white-color']};
        min-width:100px
    }
    &.outlined-matisse{
        border: 2px solid #175D9B;
        color: ${({ theme }) => theme['primary-color']};
        padding:6px 9px;
        min-width:160px;
        &.w-100{
          min-width:100px
        }
    }
  }
`;

export default ButtonWrapper;

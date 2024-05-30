import Styled from 'styled-components';

const TableWrapper = Styled.div`
.MuiTableContainer-root{
  &.bottom-wrapper{
    height: calc(100vh - 179px);
    overflow: auto;
    position: relative;
    thead{
      tr{
        th{
            background-color: ${({ theme }) => theme['table-haeder']};
            font-size: ${({ theme }) => theme['base-font-size']};
            color: ${({ theme }) => theme['chicago-color']};
            font-family: ${({ theme }) => theme['font-family']};
            white-space:nowrap;
        }
      }
    }
  }
  &.table-height{
    height: calc(100vh - 129px);
    overflow: auto;
    position: relative;
  }
  .refresh-button {
    border: 1px solid #5762c7;
    color: #5762c7;
  }
  .prod-title {
    font-size: 14px;  
    align-self: center
  }
  .root{
      display: flex;
      top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content:center;
    align-items: center;
  }
`;

export default TableWrapper;

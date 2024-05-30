import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Stack, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from '@mui/material/Pagination';
import RefreshIcon from '@mui/icons-material/Refresh';

import Button from '../button';
import Loading from '../loader';
import Select from '../select';
import TableWrapper from './style';

const SimpleTable = (props) => {
  const {
    rows,
    columns,
    data,
    totalRows,
    pageNumber,
    pageLimit: limit,
    loading,
    className,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    notShowTableFooter,
    onChange,
    onRefresh
  } = props;

  const changePageNumber = (e, value) => {
    onChange(value, limit);
  };

  const handleLimitChange = (e) => {
    onChange(1, e.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRefreshButton = () => {
    onRefresh();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableWrapper>
        <TableContainer className={className}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={Date.now().toString(36) + Math.random().toString(36).slice(2)}>
                {columns.map((column) => (
                  <TableCell
                    key={
                      column?.id || Date.now().toString(36) + Math.random().toString(36).slice(2)
                    }
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      whiteSpace: 'nowrap',
                      position: column?.headerStyle?.position,
                      right: column?.headerStyle?.right
                    }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {
                      (column.sortingId
                        && (
                          <TableSortLabel
                            active={orderBy === column.sortingId}
                            direction={orderBy === column.sortingId ? order : 'asc'}
                            onClick={createSortHandler(column.sortingId)}
                          >
                            <b>{column.label}</b>
                            {orderBy === column.sortingId ? (
                              <Box component="span" sx={{ visibility: 'hidden', pointerEvents: 'none', position: 'absolute' }}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        ))
                      || <b>{column.label}</b>
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!loading && (
              <TableBody>
                {rows?.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={Date.now().toString(36) + Math.random().toString(36).slice(2)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={Date.now().toString(36) + Math.random().toString(36).slice(2)}
                          align={column.align}
                          style={column.cellStyle}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {loading && (
            <Loading />
          )}
        </TableContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mx: 0,
            my: 0,
            border: 1,
            borderColor: '#E3E6EF',
            padding: 1
          }}
          alignItems="center"
          className="pagination"
        >
          <Box display="flex" columnGap={5}>
            <label>
              Total:
              <span className="ml-1"><b>{totalRows}</b></span>
            </label>
          </Box>
          {
            notShowTableFooter
              ? ''
              : (
                <Box display="flex" columnGap={2} alignItems="center">
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <Button variant="outlined" icon={<RefreshIcon />} onClick={handleRefreshButton} isTooltip />
                  </Box>
                  <Box display="flex" alignItems="center" columnGap={2}>
                    <label>Showing</label>
                    <Select
                      data={data}
                      sx={{ width: 80 }}
                      handleChange={handleLimitChange}
                      value={limit}
                    />
                  </Box>
                  <Pagination count={Math.ceil(totalRows / limit)} page={pageNumber} color="primary" onChange={changePageNumber} />
                </Box>
              )
          }
        </Stack>
      </TableWrapper>
    </Paper>
  );
};

export default SimpleTable;

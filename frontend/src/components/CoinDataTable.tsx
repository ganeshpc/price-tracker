import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Toolbar, Tooltip, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../store/store';
import { fetchCoins } from '../store/coinsSlice';

const EnhancedTableToolbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      ></Typography>
      <Tooltip title="Select Symbol">
        <Button
          variant="contained"
          sx={{ width: '250px' }}
          onClick={() => dispatch(fetchCoins())}
        >
          Select Symbol
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CoinDataTable = () => {
  const coins = useSelector((state: RootState) => state.coinsReducer.coins);

  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar />
      <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}>
        <Table
          sx={{ minWidth: 700 }}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Symbol</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.symbol}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default CoinDataTable;

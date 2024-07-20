import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import { AppDispatch, RootState } from '../store/store';
import {
  fetchCoins,
  setCurrentCoin,
  fetchAvailableCoins,
} from '../store/coinsSlice';
import { useEffect, useState } from 'react';

const EnhancedTableToolbar = () => {
  const availableCoins = useSelector(
    (state: RootState) => state.coinsReducer.availableCoins
  );
  const currentCoin = useSelector(
    (state: RootState) => state.coinsReducer.currentCoin
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAvailableCoins());
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectionCoin = event.target.value as string;
    dispatch(setCurrentCoin(selectionCoin));
    dispatch(fetchCoins());
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 0,
  };

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
          onClick={handleOpen}
        >
          Select Symbol
        </Button>
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5">Select Coin to Track</Typography>

          <FormControl fullWidth>
            {/* <InputLabel id="dropdown-label">Select an option</InputLabel> */}
            <Select
              labelId="dropdown-label"
              value={currentCoin}
              onChange={handleChange}
            >
              <MenuItem value={''}>{''}</MenuItem>
              {availableCoins.map((coin) => (
                <MenuItem key={coin} value={coin}>
                  {coin}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
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
              <StyledTableCell align="right">Price (USD)</StyledTableCell>
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

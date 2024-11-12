import { styled } from '@mui/material/styles';
import { TableContainer, Button, TableCell, TableRow, Box } from '@mui/material';

export const TableWrapper = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export const AddUserButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  float: 'right',
}));

export const StyledTableRow = styled(TableRow)<{ selected?: boolean }>(({ selected, theme }) => ({
  backgroundColor: selected ? theme.palette.action.hover : 'inherit',
  '&:hover': {
      backgroundColor: theme.palette.action.hover,
  },
}));

export const RemoveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.error.main,
  '&:hover': {
      backgroundColor: theme.palette.error.dark,
  },
}));

export const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
});

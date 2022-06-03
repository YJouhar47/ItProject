import * as React from 'react';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

export default function ListOfQuestions(props) {
  //Table to show data

  return (
    <div className="w-full flex justify-center items-start h-full mt-10">
   

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="right">Reason</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.question}
              </StyledTableCell>
              <StyledTableCell align="right">{item.reason}</StyledTableCell>
              <StyledTableCell align="right"> <IconButton onClick={()=>{props.deleteItem(item._id)}} edge="end" aria-label="comments">
                <DeleteIcon  />
              </IconButton></StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
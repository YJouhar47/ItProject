import React,{useState,useEffect} from "react";
import ResponsiveAppBar from "./../components/appbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function Favourite() {

  const [list, seList] = useState([]);
 
 

  const fetchLikes=()=>{
    let x=localStorage.getItem('scores')
    if(x){
        let y=JSON.parse(x)
        y.sort((a, b) => b.score - a.score);
        seList(y)
    }
  }
  

  useEffect(() => {
    fetchLikes()
   
  }, []);





  return (
    <>
      <main>
        <ResponsiveAppBar> </ResponsiveAppBar> <CssBaseline />
        <Container maxWidth="xl" style={{ marginTop:'25px'}}>
          <Box
            sx={{
              height: "100vh",
            }}
          >
              <div className="mt-10">
          {list.length>0 && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Score</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.score}
              </StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> }
    </div>
          {list.length==0 && <div className="flex h-full justify-center items-center">
            List is Empty
          </div>}
          </Box>
          
        </Container>
      </main>
    </>
  );
}

import React,{useState,useEffect, Link} from "react";
import ResponsiveAppBar from "./../components/appbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from 'axios';
import ListOfQuestions from './../components/list'
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import '../CssStyling/favoriteDislikeStyling.css'

export default function Favourite() {

  const [list, seList] = useState([]);
 
 
  //getting the list of favourites and pass to the table
  const fetchLikes=()=>{
    axios.get('http://localhost:5000/api/getAll')
        .then(response => {
           let x=response.data
           if(x.length){
              let list= x.filter(elem=>elem.status==='like')
              seList(list)
           }else{
            seList([])
           }
        });
  }
  
 //run automatically to fecth from server
  useEffect(() => {
    fetchLikes()
   
  }, []);
  
 // code for delete Item from Mongo
  const deleteItem=(id)=>{
    axios.delete('http://localhost:5000/api/delete/'+id)
    .then(response => {
        fetchLikes()
    });
  }

  //code fro Download
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    let x=[]
    list.forEach(data=>{
      x.push(data.question)
    })
    
    const file = new Blob([x.join(',\n')], {
      type: "text/plain",endings: 'native'
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };


  const Btn = styled(Button)({

    padding:'10px',
    backgroundColor: '#95c2de',
    color:'black',
    margin:'15px',
    width:'150px',
    '&:hover': {
      backgroundColor: '#FFD700',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    
    });

  return (
    <>
      <div>
        <ResponsiveAppBar> </ResponsiveAppBar> <CssBaseline />
        <Container maxWidth="xl" style={{ marginTop:'25px'}} >
          <Box
            sx={{
              height: "100vh",
            }}
          >
          {list.length>0 && <><ListOfQuestions deleteItem={deleteItem} list={list}></ListOfQuestions>
          <Btn onClick={()=>downloadTxtFile()} variant="contained">Print</Btn>
          </>}
          {list.length==0 && <div className="flex h-full justify-center items-center">
            <div className="fbDiv">
            Your have not choosen a quote as a favorite
            </div>
          </div>}
          </Box>
        </Container>
      </div>
    </>
  );
}

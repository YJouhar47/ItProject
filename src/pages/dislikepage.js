import React,{useState,useEffect} from "react";
import ResponsiveAppBar from "./../components/appbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from 'axios';
import ListOfQuestions from './../components/list'
import '../CssStyling/favoriteDislikeStyling.css'
export default function Favourite() {

  const [list, seList] = useState([]);
 
 
//getting the list of blacklist and pass to the table
  const fetchLikes=()=>{
    axios.get('http://localhost:5000/api/getAll')
        .then(response => {
           let x=response.data
           if(x.length){
              let list= x.filter(elem=>elem.status==='dislike')
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
  

// delete item from the server
  const deleteItem=(id)=>{
    axios.delete('http://localhost:5000/api/delete/'+id)
    .then(response => {
        fetchLikes()
    });
  }




  return (
    <>
      <div>
        <ResponsiveAppBar> </ResponsiveAppBar> <CssBaseline />
        <Container maxWidth="xl" style={{ marginTop:'25px'}}>
          <Box
            sx={{
              height: "100vh",
            }}
          >
          {list.length>0 && <ListOfQuestions deleteItem={deleteItem} list={list}></ListOfQuestions>}
          {list.length==0 && <div className="flex h-full justify-center items-center">
            <div className="fbDiv">
          Your have not choosen a quote as a dislike
          </div>
          </div>}
          </Box>
        </Container>
      </div>
    </>
  );
}

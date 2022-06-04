import React,{useState,useEffect} from "react";
import ResponsiveAppBar from "./../components/appbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from 'axios';
import QuizController from '../components/QuizController.js'
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {Link} from 'react-router-dom' 
import Button from '@mui/material/Button'
import styled from '@emotion/styled';
import '../CssStyling/QuizStyling.css'

export default function About() {

  const [quoets, setquoets] = useState([]);
  const [characters, setcharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [question, setQuestion] = useState([]);
  const [score,setScore]=useState(0)
  const [showQuiz,setQuiz]=useState(false)
 

// fetching the question from the list 
  const fetchquestion=()=>{
    axios.get('https://the-one-api.dev/v2/quote', {
      headers: {
        Authorization: 'Bearer ' + `26iOWShO6ucLi5SUjT-p` //the token is a variable which holds the token
      }
     }).then(data=>{
       console.log('data',data)
        setquoets(data.data.docs)
        getRandomQuestion(data.data.docs)
     })
  }

  //fetching the characters and saving it to server
  const fetchCharacters=()=>{
    axios.get('https://the-one-api.dev/v2/character', {
      headers: {
        Authorization: 'Bearer ' + `26iOWShO6ucLi5SUjT-p` //the token is a variable which holds the token
      }
     }).then(data=>{
       setcharacters(data.data.docs)
     })
  }

  //generating the random questions from the list of questions
  const getRandomQuestion=(quoets)=>{
    let newItems=[]
    let items=[...quoets];
    for (var i = 0; i < 10; i++) {
      var idx = Math.floor(Math.random() * items.length);
      newItems.push(items[idx]);
      items.splice(idx, 1);
    }
    setQuestion(newItems)
    console.log(newItems)

  }
 //fetching the movies list and set to state 
  const fetchMovies=()=>{
    axios.get('https://the-one-api.dev/v2/movie', {
      headers: {
        Authorization: 'Bearer ' + `26iOWShO6ucLi5SUjT-p` //the token is a variable which holds the token
      }
     }).then(data=>{
       setMovies(data.data.docs)
     })
     
  }


  useEffect(() => {
    fetchquestion()
    fetchCharacters()
    fetchMovies()
    return () => {
      
    };
  }, []);

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
      <main>

      
        <ResponsiveAppBar> </ResponsiveAppBar> <CssBaseline />
        <Container maxWidth="xl">
          <Box
            sx={{
              height: "100vh",
            }}
          >

            <div className="w-full flex justify-center items-center h-full">
          {(movies.length>0 && characters.length>0) && <>      
                 {showQuiz ? <QuizController question={question} character={characters} movies={movies}  /> : <div className='StartQuizBtn'><Btn onClick={()=>{setQuiz(true)}} variant="contained">Start Quiz</Btn></div>}
            </> }
            {(movies.length==0 && characters.length==0) && <> <CircularProgress /></>}
            </div>
          </Box>
          <div className='GoBackBtn'><Btn> <Link to="/">Go Back</Link></Btn></div>
        </Container>
      </main>
      
    </>
  );
}

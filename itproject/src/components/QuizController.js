import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Answers from "./answer";
import Switch from "@mui/material/Switch";
import LikeDislike from './Like'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuizController(props) {
  const [question, setquestion] = useState(props.question);
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [count, setcount] = useState(0);
  const [totalscore, setTotalscore] = useState(0);
  const [results, showResultsOnly] = useState(false);
  const [suddenDeath, setSuddenDeath] = useState(false);
  const [charans, setcharans] = useState(null);
  const [ansrow,setansRow]=useState(0)
  useEffect(() => {
    getRandomMovies();
    getRandomCharacters();
  }, []);
 //picking random movies
  const getRandomMovies = () => {
    let newItems = [];
    let items = [...props.movies];
    let index=items.findIndex(elem=>elem._id===question[count].movie)
    if(index>-1){
        items.splice(index,1)
    }

    for (var i = 0; i < 3; i++) {
      var idx = Math.floor(Math.random() * items.length);
      newItems.push(items[idx]);
      items.splice(idx, 1);
    }
    let correctAnswer = props.movies.filter(
      (elem) => elem._id === question[count].movie
    );
    let x=getShuffledArr([...newItems, ...correctAnswer])
   
    setMovies(x);
  };
//making random characters for answers
  const getRandomCharacters = () => {
    let newItems = [];
    let items = [...props.character];
    for (var i = 0; i < 3; i++) {
      var idx = Math.floor(Math.random() * items.length);
      newItems.push(items[idx]);
      items.splice(idx, 1);
    }
    let correctAnswer = props.character.filter(
      (elem) => elem._id === question[count].character
    );
    let x=getShuffledArr([...newItems, ...correctAnswer])
    setCharacters(x);
  };

  const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

  //checking question are 10 10 completed then show results
  const checkMovieAnswer = (data) => {
    if (count == 9) {
      setScores()
      showResultsOnly(true);
    } else {
     
      let index=props.character.findIndex(data=>data._id==question[count+1].character)
      console.log('index',index)
      setcount(count + 1);
      setcharans(props.character[index].name)
      setTotalscore(totalscore + data);
    }
  };
//handling game mode sudden death if answer wrong just show results
  const suddenDeathHappen = () => {
    setScores()
    showResultsOnly(true);
  };

  //handling scores after game is finished 
  const setScores=()=>{
   let x=localStorage.getItem('scores')
   if(x){
     let y=JSON.parse(x)
     y.push({score:totalscore,time:new Date()})
     localStorage.setItem('scores',JSON.stringify(y))
   }else{
     let y=[]
     y.push({score:totalscore,time:new Date()})
     localStorage.setItem('scores',JSON.stringify(y))
   }
  }

  const setansRowForDeath=()=>{
    setansRow(ansrow+1)
  }
//on change of question make new random movies and charaters
  useEffect(() => {
    getRandomCharacters();
    getRandomMovies();
  }, [count]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      {!results && (
        <>
          <div className="w-3/4 flex justify-center items-center h-full">
            <div className="flex-col">
              <div className="p-6">
                <h4>{question[count].dialog}</h4>
              </div>
              <LikeDislike question={`${question[count].dialog}--${charans}`}></LikeDislike>
            
              {movies.length > 0 && characters.length > 0 && (
                <Answers
                setansRowForDeath={setansRowForDeath}
                  suddenDeathHappened={suddenDeathHappen}
                  suddenDeath={suddenDeath}
                  subMitAnswer={(data) => checkMovieAnswer(data)}
                  question={question[count]}
                  movies={movies}
                  characters={characters}
                />
              )}
            </div>
          </div>
          <div className="w-1/4 flex justify-center items-center h-full">
            <div>
              <div>
                {" "}
                <Switch
                  value={suddenDeath}
                  onChange={(event) => setSuddenDeath(event.target.value)}
                  {...label}
                  color="warning"
                />
              </div>
              <h2>Sudden Death Mode</h2>
              <h4 className="mt-8">Total Score {totalscore}</h4>
            </div>
          </div>
        </>
      )}

      {results && (
        <>
          <div className="w-full flex justify-center items-center h-full">
            <div className="">
              <h4>Total Score {totalscore}</h4>
              {suddenDeath && <h3>Sudden Death Happened : Correct Answer in Row is {ansrow}</h3>}
            </div>
          </div>
        </>
      )}
    </>
  );
}

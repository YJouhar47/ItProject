import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

export default function Answers(props){
   const {characters,movies,question,suddenDeath,suddenDeathHappened}=props
   const [answers,setAnswers]=useState({movieAns:null,charAns:null})
   
   //when user submit the submit the answer with id we have to check its movie answer or character answer and then 
   // check the state if both answers submit then move to next question
   const submitAns=(ans,data)=>{
     if(ans==='movie'){
       let x=getAnsMovie(data)
       if(suddenDeath && x==0){
        suddenDeathHappened()
       }
       setAnswers({...answers,movieAns:x})
     }else{
      let x=getAnsCharacter(data)
      if(suddenDeath && x==0){
        suddenDeathHappened()
       }
      setAnswers({...answers,charAns:x})
     }
    // checkAnswers()
   }

   
   /// here is listener for answer when answer get change its notify
   useEffect(()=>{
    if(answers.movieAns!=null && answers.charAns!=null){
      props.subMitAnswer(answers.movieAns+answers.charAns)
      setAnswers({movieAns:null,charAns:null})
    }
   },[answers])

    //telling the score of correct answer and return for movie
   const getAnsMovie=(data)=>{
    if(question.movie===data){
      props.setansRowForDeath()
      return 0.5
    }else{
      return 0
    }
   }
 //telling the score of correct answer and return for character
   const getAnsCharacter=(data)=>{
    if(question.character===data){
      props.setansRowForDeath()
      return 0.5
    }else{
      return 0
    }
   }

    return(
        <>
        <div className="mt-20">
         
           {(answers.charAns==null) && <>
            <h4>Select Character</h4>
             {characters.length>0 ? <Grid   container spacing={2}>
              {characters.map((data)=> {return <Grid onClick={()=>{submitAns('char',data._id)}} item xs={3}>
                <Item>{data.name}</Item>
              </Grid>})}
             
            </Grid>:<></>} </>}
          </div>
          <div className="mt-10">
          {(answers.movieAns==null) && <>
          <h4>Select Movie</h4>
          {movies.length>0 ? <Grid container spacing={2}>
          {movies.map((data)=> {return <Grid onClick={()=>{submitAns('movie',data._id)}} item xs={3}>
                <Item>{data.name}</Item>
              </Grid>})}
            </Grid>:<></>} 
            </>}
          </div>
        </>
    )
}
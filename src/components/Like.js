import React, { useState } from "react";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import apiUrl from "../pages/api";
export default function LikeDislike(props) {

 const [showInut,setShowInput]= useState(false)
 const [status,setstatus]= useState(null)
 const [reason,setReason]= useState(null)
   const setLike=(status)=>{
       setstatus(status)
       setShowInput(true)
   }
   // calling the api to save the like dislike of the question
   // after api call finished save the state and revert back the input field hide
   const callApi=()=>{
    const item = { status:status,reason:reason,question:props.question};
    axios.post(apiUrl+'/post', item)
        .then(response => {
            setstatus(null)
            setShowInput(false)
            setReason(null)
        });
   }

  return (
      <>
    <div className="p-4 flex-row flex  justify-center items-center ">
      <div className="px-4">
        {" "}
        <ThumbDownAltIcon onClick={()=>{setLike('dislike')}}> </ThumbDownAltIcon>
      </div>
      <div className="px-4">
        {" "}
        <ThumbUpIcon onClick={()=>{setLike('like')}}> </ThumbUpIcon>
      </div>
    </div>
    {showInut && <>
    <div className="p-4 flex-row flex  justify-center items-center ">
    <TextField value={reason} onChange={(event)=>{setReason(event.target.value)}} id="outlined-basic" label="Reason" variant="outlined" />

    </div>
    <div className="p-4 flex-row flex  justify-center items-center ">
    <Button onClick={()=>callApi()} variant="contained">save</Button>

    </div>
    </>}
    </>
  );
}

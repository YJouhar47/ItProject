import React, { Component }  from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import '../CssStyling/ErrorPage.css'
export default function ErrorPage () 
{


      const Btn = styled(Button)({

            padding:'10px',
            backgroundColor:'black',
            color:'white',
            margin:'15px',
            '&:hover': {
              backgroundColor: '#FFD700',
              borderColor: '#0062cc',
              boxShadow: 'none',
            },
            
            });

    return (
      <div>
      <head>
        <script src="https://kit.fontawesome.com/4b9ba14b0f.js" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap"/>
      </head>
        <div class="mainbox">
          <div class="err">4</div>
          <div class="err1">0</div>
          <div class="err2">4</div>
          <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go<Btn> <Link to="/" style={{textDecoration:'none', color:'white'}}>home</Link></Btn>and try from there.</p></div>
          
            </div>
            </div>
            
      );
}
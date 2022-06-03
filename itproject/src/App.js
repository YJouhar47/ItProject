import React, { Component }  from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Quiz from './pages/quiz'
import Favourite from './pages/favouritesPage'
import BlackList from './pages/dislikepage'
import Score from './pages/scores'
import Error from './pages/ErrorPage'
import Button from '@mui/material/Button'
import styled from '@emotion/styled';

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


function App() {
  return (
    <div className="App">
    
    <Routes>
      <Route index element={<Home />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="Favourites" element={<Favourite />} />
      <Route path="BlackLists" element={<BlackList />} />
      <Route path="Scores" element={<Score />} />
      <Route path="Error" element={<Error/>}/>
    </Routes>
  </div>
  );
}
function Home() {
  return (
    <>
      <nav>
      <h1>Welcome to best game application</h1>
        <h4>Choose one of the games you want to play.</h4>
        <br/>
        <div className='home'>
        <div className='polaroid'>
        <Link to="/quiz"><img Src='https://playsense.nl/wp-content/uploads/2021/10/Lord-Of-the-Rings-Rise-to-War-Main-Art.jpg'></img></Link>
        <div className='container'>
        <p>Lord Of The Rings</p>
        </div>
        </div>
        <div className='polaroid'>
        <Link to="/Error"><img Src='https://cdn-japantimes.com/wp-content/uploads/2022/02/np_file_143985.jpeg'></img></Link>
        <div className='container'>
        <p>Fifa</p>
        </div>
        </div>
        <div className='polaroid'>
        <Link to="/Error"><img Src='https://cdn.gobankingrates.com/wp-content/uploads/2019/09/Magic-the-Gathering-trading-cards-shutterstock_1190119702.jpg'></img></Link>
        <div className='container'>
        <p>Magic The Gathering</p>
        </div>
        </div>
        <div className='polaroid'>
        <Link to="/Error"><img Src='https://www.nbb.be/sites/nbb.be/files/socialsharefacebook.png'></img></Link>
        <div className='container'>
        <p>Nationale Bank</p>
        </div>
        </div>
        <div className='polaroid'>
        <Link to="/Error"><img Src='https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Fortnite.jpg'></img></Link>
        <div className='container'>
        <p>Fortnite</p>
        </div>
        </div>
        <div>
        <div className='polaroid'>
        <Link to="/Error"><img Src='https://www.rtlboulevard.nl/sites/default/files/content/images/2021/06/30/LEGO%20MASTERS.png?itok=AgNDwG4s&width=2048&height=1152&impolicy=semi_dynamic'></img></Link>
        <div className='container'>
        <p>Lego Masters</p>
        </div>
        </div>
        </div>
        </div>
        
      </nav>
   
    </>
  );
}


export default App;

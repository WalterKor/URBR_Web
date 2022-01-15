import React from 'react';
import { BrowserRouter ,Route, Routes } from 'react-router-dom'

import JoinPage from './components/views/JoinPage/JoinPage';
import LandingPage from './components/views/LandingPage/LandingPage'


function App() {
  return (
    <BrowserRouter>
      <div>Header</div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/join" element={<JoinPage/>}/>
      </Routes>
      <div>Footer</div>
    </BrowserRouter>
  );
}

export default App;

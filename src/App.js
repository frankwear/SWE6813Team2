import React, { Component } from 'react';
import { Navigate, Routes, Route, Link, BrowserRouter  } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import LoginPage from './components/Views/LoginPage.js';
import NavBar from "./components/Nav/NavBar.js";
import LandingPage from './components/Views/LandingPage.js';


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route>
            <Route path="/login" element={<LoginPage />} />
</Route>
</Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};




  export default App;
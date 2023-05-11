import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Menu from './pages/Menu';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Menu/>}></Route>
          {/* <Route path="Simulator/:id" element={<Simulator/>}</Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

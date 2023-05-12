import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Menu from './pages/Menu';
import Problem from './class/Problem';
import Problems from './class/Problems';

const App = () => {
  const P: Problems = new Problems();

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Menu Probs={P}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './pages/Menu';
import Problems from './class/Problems';
import Simulator from './pages/Simulator';

const App = () => {
  const P: Problems = new Problems();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu Probs={P}/>}></Route>
          <Route path="/:id/*" element={<Simulator Probs={P}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Simulator from './pages/Simulator';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Simulator/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

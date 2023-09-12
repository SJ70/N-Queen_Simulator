import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Simulator from './pages/Simulator';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/*" element={<Simulator/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

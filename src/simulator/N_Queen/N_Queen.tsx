import { Routes, Route } from 'react-router-dom';
import Initializer from './N_Queen_Initializer';
import Simulator from './N_Queen_Simulator';
import './N_Queen.css';

const N_Queen = () => {
    return(
        <div className="N_Queen">
            <Routes>
                <Route path="/" element={<Initializer/>}></Route>
                <Route path="/n/:n/fps/:fps" element={<Simulator/>}></Route>
            </Routes>
        </div>
    )
}

export default N_Queen;
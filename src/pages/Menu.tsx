import React from 'react';
import './Menu.css';
import '../components/Restrict.css';
import Select from '../components/simulator/Select';
import Problem from '../class/Problem';
import Problems from '../class/Problems';

const Menu = () => {
  const Probs: Problems = new Problems();

  return (
    <div className="Restrict">
        <div className="Menu">
            {/* <sort></sort> */}
            {Probs.getProblems().map(prob => (
              <Select prob={prob}/>
            ))}
        </div>
    </div>
  );
}

export default Menu;

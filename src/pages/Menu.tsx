import React from 'react';
import './Menu.css';
import '../components/Restrict.css';
import Select from '../components/simulator/Select';

const Menu = () => {
  return (
    <div className="Restrict">
        <div className="Menu">
            {/* <select></select> */}
            {/* <sort></sort> */}
            <Select/>
        </div>
    </div>
  );
}

export default Menu;

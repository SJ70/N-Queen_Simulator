import React from 'react';
import './Header.css';
import './Restrict.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
        <div className="Restrict">
            <div className="Items">
                <Link to="/"><img src={ require("../img/logo.png")}></img></Link>
            </div>
        </div>
    </div>
  );
}

export default Header;

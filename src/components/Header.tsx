import React from 'react';
import './Header.css';
import './Restrict.css';

const Header = () => {
  return (
    <div className="Header">
        <div className="Restrict">
            <div className="Items">
                <img src={ require("../img/logo.png")}></img>
            </div>
        </div>
    </div>
  );
}

export default Header;

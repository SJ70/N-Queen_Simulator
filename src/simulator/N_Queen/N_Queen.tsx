import React from 'react';
import './N_Queen.css';

const N_Queen = () => {
  return (
    <div className="N_Queen">
      <div className="N">
        <div className="row">
          <p>N = </p>
          <input type="text" placeholder='8'></input>
        </div>
        <input type="range"></input>
      </div>
      <div className="FPS">
        <div className="row">
          <p>초당 프레임 수 : </p>
          <input type="text" placeholder='1'></input>
        </div>
        <input type="range"></input>
      </div>
      <button>시작하기</button>
    </div>
  );
}

export default N_Queen;
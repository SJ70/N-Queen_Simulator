import React, {useState} from 'react';
import './N_Queen.css';

const n_min: number = 1;
const n_max: number = 15;
const fps_min: number = 1;
const fps_max: number = 144;

const N_Queen = () => {
  const [n, setN] = useState<number>(8);
  const [fps, setFps] = useState<number>(1);

  return (
    <div className="N_Queen">
      <div className="N">
        <div className="row">
          <p>N = </p>
          <input type="text" value={n} onFocus={e => e.target.select()} onChange={e => setN(getNValue(e.target.value))}></input>
        </div>
        <input type="range" value={n} min={n_min} max={n_max} step={1} onChange={e => setN(Number(e.target.value))}></input>
      </div>
      <div className="FPS">
        <div className="row">
          <p>초당 프레임 수 : </p>
          <input type="text" value={fps} onFocus={e => e.target.select()} onChange={e => setFps(getFpsValue(e.target.value))}></input>
        </div>
        <input type="range" value={fps} min={fps_min} max={fps_max} step={1} onChange={e => setFps(getFpsValue(e.target.value))}></input>
      </div>
      <button>시작하기</button>
    </div>
  );
}

function getNValue(str: string): number{
  let n = Number(str);
  return getValue(n,n_min,n_max);
}

function getFpsValue(str: string): number{
  let fps = Number(str);
  return getValue(fps,fps_min,fps_max);
}

function getValue(n: number, min: number, max: number){
  return (n>max)?max : (n<min)?min : n;
}

export default N_Queen;
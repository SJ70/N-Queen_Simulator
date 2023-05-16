import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Initializer.css';

const n_min: number = 1;
const n_max: number = 14;
const fps_min: number = 1;
const fps_max: number = 144;

const Initializer = () => {
  const [n, setN] = useState<number>(8);
  const [fps, setFps] = useState<number>(1);

  return (
    <div className="Init">
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
      <Link to={"./n/"+n+"/fps/"+fps}>
        <button>시작하기</button>
      </Link>
    </div>
  );
}

function getNValue(str: string): number{
  let n = Number(str);
  return getNumberValue(n,n_min,n_max);
}

function getFpsValue(str: string): number{
  let fps = Number(str);
  return getNumberValue(fps,fps_min,fps_max);
}

function getNumberValue(n: number, min: number, max: number){
  if(Number.isNaN(n)) return 1;
  return (n>max)?max : (n<min)?min : n;
}

export default Initializer;
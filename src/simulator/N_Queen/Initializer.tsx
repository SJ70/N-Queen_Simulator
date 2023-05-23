import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Initializer.css';

const n_min: number = 1;
const n_max: number = 14;

const Initializer = () => {
  const [n, setN] = useState<number>(8);

  return (
    <div className="Init">
      <div className="N">
        <div className="row">
          <p>N = </p>
          <input type="text" value={n} onFocus={e => e.target.select()} onChange={e => setN(getNValue(e.target.value))}></input>
        </div>
        <input type="range" value={n} min={n_min} max={n_max} step={1} onChange={e => setN(Number(e.target.value))}></input>
      </div>
      <Link to={"./n/"+n}>
        <button>시작하기</button>
      </Link>
    </div>
  );
}

function getNValue(str: string): number{
  let n = Number(str);
  return getNumberValue(n,n_min,n_max);
}

function getNumberValue(n: number, min: number, max: number){
  if(Number.isNaN(n)) return 1;
  return (n>max)?max : (n<min)?min : n;
}

export default Initializer;
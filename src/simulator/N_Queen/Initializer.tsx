import {ChangeEvent, FocusEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import './Initializer.css';

const N_MIN: number = 1;
const N_MAX: number = 14;

const Initializer = () => {
  const [n, setN] = useState<number>(8);

  const handleInputFoucs = (e: FocusEvent<HTMLInputElement>) =>{
    e.target.select();
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setN(+e.target.value);
  }

  return (
    <div className="Init">
      
      <div className='title'>
          <span className="queen">N-Queen Simulator</span>
      </div>

      <div className="form">
        <div className="N">
          <div className="row">
            <p>N = </p>
            <input type="text" value={n} onFocus={handleInputFoucs} onChange={handleInputChange}></input>
          </div>
          <input type="range" value={n} min={N_MIN} max={N_MAX} step={1} onChange={e => setN(Number(e.target.value))}></input>
        </div>
        <Link className="button" to={"./n/"+n}>
          <button className="button">시작하기</button>
        </Link>
        <p className="desc">성능에 따라 시간이 소요될 수 있습니다.</p>
      </div>
    </div>
  );
}

export default Initializer;
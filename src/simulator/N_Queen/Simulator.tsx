import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Algorithm from './Algorithm';
import './Simulator.css';
import { Decrypt } from './Crypto';
import { VscChevronLeft, VscChevronRight, VscDebugPause, VscDebugStart } from "react-icons/vsc"
import GoBack from '../../components/GoBack';

const FPS_MIN: number = 1;
const FPS_MAX: number = 1000;

let N: number;
let FPS: number;
let ALGO: Algorithm;
let HISTORY: number[];
let USESTATE: React.Dispatch<React.SetStateAction<number>>[][];
let GETVALUE: Function[][];
let INDEX: number;
let RESULT: number;

let AUTO: NodeJS.Timer;
let AUTO_FUNC: Function; 
let AUTO_TOGGLE: boolean;
let START_AUTO: Function;
let STOP_AUTO: Function;

const changeIndex = (dir:number): void => {
    let nextIndex = INDEX + dir;
    if( nextIndex > HISTORY.length || nextIndex < 0 ) return;

    let pos: number[] = Decrypt(HISTORY[ (dir>0) ? INDEX : INDEX-1 ]);
    putQueen(pos[0], pos[1], dir);

    INDEX = nextIndex;
}

const QUEEN = 100000;
const CANNOTPUT = 1;
const putQueen = (r:number, c:number, dir:number): void => {
    let value = GETVALUE[r][c]();
    let put: number = (value<QUEEN) ? 1 : -1;
    if(r==N-1){
        if(put==1 && dir>0) RESULT++;
        else if(put==-1 && dir<0) RESULT--;
    }
    fillRed(r,c,put);
    USESTATE[r][c]( value + QUEEN*put );
}
const fillRed = (r:number, c:number, put:number): void => {
    //가로세로
    for(let i=0; i<N; i++){
        USESTATE[r][i]( GETVALUE[r][i]() + CANNOTPUT*put );
        USESTATE[i][c]( GETVALUE[i][c]() + CANNOTPUT*put );
    }
    //우상향대각
    for(let i=1; r+i<N && c-i>=0; i++){
        USESTATE[r+i][c-i]( GETVALUE[r+i][c-i]() + CANNOTPUT*put );
    }
    for(let i=-1; r+i>=0 && c-i<N; i--){
        USESTATE[r+i][c-i]( GETVALUE[r+i][c-i]() + CANNOTPUT*put );
    }
    //우하향대각
    for(let i=1; r+i<N && c+i<N; i++){
        USESTATE[r+i][c+i]( GETVALUE[r+i][c+i]() + CANNOTPUT*put );
    }
    for(let i=-1; r+i>=0 && c+i>=0; i--){
        USESTATE[r+i][c+i]( GETVALUE[r+i][c+i]() + CANNOTPUT*put );
    }
}

const isLastIndex = (i: number):boolean => {
    return i==HISTORY.length;
}

const Simulator = () => {

    N = Number(useParams().n);
    FPS = 1;
    ALGO = new Algorithm(N);
    HISTORY = ALGO.getHistory();
    INDEX = 0;
    RESULT = 0;
    AUTO_TOGGLE = false;

    document.documentElement.style.setProperty('--N',String(N));

    USESTATE = new Array(N);
    GETVALUE = new Array(N);
    for(let i=0; i<N; i++){
        USESTATE[i] = new Array(N);
        GETVALUE[i] = new Array(N);
    }

    return (
        <div className='Simulator'>
            <View/>
        </div>
    )
} 

const View = () =>{
    const [index, setIndex] = useState<number>(INDEX);
    const [result, setResult] = useState<number>(RESULT);
    const [autoToggle, setAutoToggle] = useState<boolean>(false);

    AUTO_FUNC = ():void => {
        if(!AUTO_TOGGLE || INDEX+1 > HISTORY.length){
            STOP_AUTO();
            return;
        } 
        let pos: number[] = Decrypt(HISTORY[INDEX]);
        putQueen(pos[0], pos[1], 1);
        INDEX++;
        setIndex(INDEX);
        setResult(RESULT)
    }
    const InitIndex = ():void => {
        INDEX = 0;
        RESULT = 0;
        setIndex(INDEX);
    }

    START_AUTO = ():void => {
        if(isLastIndex(index)) InitIndex();
        AUTO = setInterval(()=>AUTO_FUNC(), 1000/FPS);
        AUTO_TOGGLE = true;
        setAutoToggle(true);
    }
    STOP_AUTO = ():void => {
        clearInterval(AUTO);
        AUTO_TOGGLE = false;
        setAutoToggle(false);
    }
    
    return(
        <div className='view'>
            <GoBack/>

            <div className='top'>
                <span className="n">{N}</span>
                <span className="queen">-Queen</span>
            </div>

            <div className='mid'>
                <VscChevronLeft className='arrow' onClick={()=>{
                    STOP_AUTO();
                    changeIndex(-1);
                    setIndex(INDEX);
                    setResult(RESULT);
                }}/>
                <Table N={N}/>
                <VscChevronRight className='arrow' onClick={()=>{
                    if(isLastIndex(index)) InitIndex();
                    STOP_AUTO();
                    changeIndex(1);
                    setIndex(INDEX);
                    setResult(RESULT);
                }}/>
            </div>


            <div className='bottom'>
                <ShowValue name="result" value={result} maxValue={ALGO.getResult()}/>       
            {  
                autoToggle
                ? (<VscDebugPause className='start_pause' onClick={()=>STOP_AUTO()}/>)
                : (<VscDebugStart className='start_pause' onClick={()=>START_AUTO()}/>)
            }
                <ShowValue name="pages" value={index} maxValue={HISTORY.length}/>       
            </div>

            <FPSsetter/>
        </div>
    );
}

const Table = ({N}: {N:number}) => {
    let arr = []; 
    for(let r=0; r<N; r++){
        arr.push(
            <Row key={r} N={N} row={r}/>
        );
    }
    return (
        <table>
            <tbody>
                {arr}
            </tbody>
        </table>
    )
}
const Row = ({N, row}: {N: number, row:number}) => {
    let arr = [];
    for(let c=0; c<N; c++){
        arr.push(
            <Column key={c} row={row} column={c}/>
        );
    }
    return (
        <tr>
            {arr}
        </tr>
    )
}
const Column = ({row, column}: {row:number, column:number}) => {
    const [value, setValue] = useState<number>(0);
    USESTATE[row][column] = setValue;
    const getValue = ():number => {
        return value;
    }
    GETVALUE[row][column] = getValue;

    const style: string = ((row+column)%2==0) ? "black" : "white";
    const element: JSX.Element = (value>=QUEEN) ? (<img src={require("../../img/LightQueen.webp")}></img>) : (value>=CANNOTPUT) ? (<div className="red"/>) : (<div/>);
    return (
        <td className={style}>
            {/* {value} */}
            {element}
        </td>
    )
}

const ShowValue = ({name, value, maxValue}: {name:string, value:number, maxValue:number}) => {
    return(
        <div className="showValue">
            <p className="name">{name}</p>
            <div className="values">
                <span className="value">{value}</span>
                <span className="maxValue">/{maxValue}</span>
            </div>
        </div>
    )
}

const FPSsetter = () => {

    const [fps, setFps] = useState<number>(FPS);

    const setFpsValue = (str: string): void => {
        FPS = getFpsValue(str);
        setFps(FPS);
        STOP_AUTO();
    }
    const getFpsValue = (str: string): number => {
        let fps = Number(str);
        return getNumberValue(fps, FPS_MIN, FPS_MAX);
    }
    const getNumberValue = (n: number, min: number, max: number) => {
        if(Number.isNaN(n)) return 1;
        return (n>max)?max : (n<min)?min : n;
    }

    return(
        <div className="FPSsetter">
            <div className="row">
                <span className="fps">FPS</span>
                <input type="text" value={fps} onFocus={e => e.target.select()} onChange={e => setFpsValue(e.target.value)}></input>
            </div>
            <input type="range" value={fps} min={FPS_MIN} max={FPS_MAX} step={1} onChange={e => setFpsValue(e.target.value)}></input>
            <p className="desc">성능에 따라 실제 프레임 수와 다를 수 있습니다.</p>
        </div>
    )
}

export default Simulator;
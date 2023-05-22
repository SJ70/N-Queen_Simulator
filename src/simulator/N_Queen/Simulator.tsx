import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Algorithm from './Algorithm';
import './Simulator.css';
import { Decrypt } from './Crypto';
import { VscChevronLeft, VscChevronRight, VscDebugPause, VscDebugStart } from "react-icons/vsc"

const fps_min: number = 1;
const fps_max: number = 1000;

let N: number;
let FPS: number;
let ALGO: Algorithm;
let HISTORY: number[];
let USESTATE: React.Dispatch<React.SetStateAction<number>>[][];
let GETVALUE: Function[][];
let INDEX: number;

let AUTO: NodeJS.Timer;
let AUTO_FUNC: Function; 
let AUTO_TOGGLE: boolean;

const changeIndex = (dir:number): void => {
    let nextIndex = INDEX + dir;
    if( nextIndex > HISTORY.length || nextIndex < 0 ) return;

    let pos: number[] = Decrypt(HISTORY[ (dir>0) ? INDEX : INDEX-1 ]);
    putQueen(pos[0], pos[1]);

    INDEX = nextIndex;
}

const QUEEN = 100000;
const CANNOTPUT = 1;
const putQueen = (r:number, c:number): void => {
    console.log(r,c);
    let value = GETVALUE[r][c]();
    let put: number = (value<QUEEN) ? 1 : -1;
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

const Simulator = () => {

    N = Number(useParams().n);
    FPS = 1;
    ALGO = new Algorithm(N);
    HISTORY = ALGO.getHistory();
    INDEX = 0;
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
    const [index,setIndex] = useState<number>(INDEX);

    const [autoToggle, setAutoToggle] = useState<boolean>(false);

    AUTO_FUNC = ():void => {
        if(!AUTO_TOGGLE || INDEX+1 > HISTORY.length){
            stopAuto();
            clearInterval(AUTO);
            return;
        } 
        let pos: number[] = Decrypt(HISTORY[INDEX]);
        putQueen(pos[0], pos[1]);
        INDEX++;
        setIndex(INDEX);
    }

    const startAuto = ():void => {
        if(index==HISTORY.length){
            INDEX = 0;
            setIndex(INDEX);
        } 
        AUTO = setInterval(()=>AUTO_FUNC(), 1000/FPS);
        AUTO_TOGGLE = true;
        setAutoToggle(true);
    }
    const stopAuto = ():void => {
        AUTO_TOGGLE = false;
        setAutoToggle(false);
    }

    const [fps, setFps] = useState<number>(FPS);

    const setFpsValue = (str: string): void => {
        FPS = getFpsValue(str);
        setFps(FPS);
        stopAuto();
    }
    const getFpsValue = (str: string): number => {
        let fps = Number(str);
        return getNumberValue(fps,fps_min,fps_max);
    }
    const getNumberValue = (n: number, min: number, max: number) => {
        if(Number.isNaN(n)) return 1;
        return (n>max)?max : (n<min)?min : n;
    }
    
    return(
        <div className='view'>
            <VscChevronLeft className='arrow' onClick={()=>{stopAuto(); changeIndex(-1); setIndex(INDEX);}}/>
            <Table N={N}/>
            <VscChevronRight className='arrow' onClick={()=>{stopAuto(); changeIndex(1); setIndex(INDEX);}}/>
            {  
                autoToggle
                ? (<VscDebugPause className='start_pause' onClick={()=>stopAuto()}/>)
                : (<VscDebugStart className='start_pause' onClick={()=>startAuto()}/>)
            }
            {index}/{HISTORY.length}
            <div className="FPS">
                <div className="row">
                <p>초당 프레임 수 : </p>
                <input type="text" value={fps} onFocus={e => e.target.select()} onChange={e => setFpsValue(e.target.value)}></input>
                </div>
                <input type="range" value={fps} min={fps_min} max={fps_max} step={1} onChange={e => setFpsValue(e.target.value)}></input>
            </div>
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
            {value}
            {element}
        </td>
    )
}

export default Simulator;
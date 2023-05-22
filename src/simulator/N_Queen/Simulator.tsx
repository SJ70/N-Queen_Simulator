import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Algorithm from './Algorithm';
import './Simulator.css';
import { Decrypt } from './Crypto';
import { VscChevronLeft, VscChevronRight, VscDebugPause, VscDebugStart } from "react-icons/vsc"

const fps_min: number = 1;
const fps_max: number = 144;

let _useState: React.Dispatch<React.SetStateAction<number>>[][];
let _getValue: Function[][];

const N_Queen_Simulator = () => {

    const { n } = useParams();
    const N: number = Number(n);

    const Algo: Algorithm = new Algorithm(N);
    const History: number[] = Algo.getHistory();

    document.documentElement.style.setProperty('--N',String(N));

    _useState = new Array(N);
    _getValue = new Array(N);
    for(let i=0; i<N; i++){
        _useState[i] = new Array(N);
        _getValue[i] = new Array(N);
    }
    const changeTableValue = (r:number, c:number, value:number) => {
        _useState[r][c](value);
    }


    const [index,setIndex] = useState(0);
    const changeIndex = (value:number): void => {
        let i: number = index + value;
        if(value>0){
            if(i>History.length){
                setAuto(false);
                return;
            } 
            let pos: number[] = Decrypt(History[index]);
            setQueen(pos[0], pos[1]);
        }
        else{
            if(i<0) return;
            let pos: number[] = Decrypt(History[index-1]);
            setQueen(pos[0], pos[1]);
        }
        setIndex(i);
    }
    const setQueen = (r:number, c:number): void => {
        let value = _getValue[r][c]();
        value += value>=100 ? -100 : 100;
        changeTableValue(r,c,value);
    }

    const [auto, setAuto] = useState(false);

    useEffect(() => {
        setTimeout(()=>{
            if(auto){
                changeIndex(1); 
            }
        }, 1000/fps);
    });

    const [fps, setFps] = useState<number>(1);
    function getFpsValue(str: string): number{
        setAuto(false);
        let fps = Number(str);
        return getNumberValue(fps,fps_min,fps_max);
    }

    function getNumberValue(n: number, min: number, max: number){
        if(Number.isNaN(n)) return 1;
        return (n>max)?max : (n<min)?min : n;
    }

    return (
        <div className='Simulator'>
            <VscChevronLeft className='arrow' onClick={()=>{setAuto(false); changeIndex(-1);}}/>
            <Table N={N}/>
            <VscChevronRight className='arrow' onClick={()=>{setAuto(false); changeIndex(1);}}/>
            {  
                auto
                ? (<VscDebugPause className='start_pause' onClick={()=>{setAuto(false);}}/>)
                : (<VscDebugStart className='start_pause' onClick={()=>{setAuto(true); if(index==History.length) setIndex(0);}}/>)
            }
            {index}/{History.length}
            <div className="FPS">
                <div className="row">
                <p>초당 프레임 수 : </p>
                <input type="text" value={fps} onFocus={e => e.target.select()} onChange={e => setFps(getFpsValue(e.target.value))}></input>
                </div>
                <input type="range" value={fps} min={fps_min} max={fps_max} step={1} onChange={e => setFps(getFpsValue(e.target.value))}></input>
            </div>
        </div>
    )
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
    _useState[row][column] = setValue;
    const getValue = ():number => {
        return value;
    }
    _getValue[row][column] = getValue;

    const style: string = ((row+column)%2==0) ? "black" : "white";
    const element: JSX.Element = (value>=100) ? (<img src={require("../../img/LightQueen.webp")}></img>) : (<div></div>);
    return (
        <td className={style}>
            {/* {value} */}
            {element}
        </td>
    )
}

export default N_Queen_Simulator;
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Algorithm from './N_Queen_Algorithm';
import './N_Queen_Simulator.css';
import { Decrypt } from './Crypto';

let useStateArr: React.Dispatch<React.SetStateAction<number>>[][];

const N_Queen_Simulator = () => {

    const { n, fps } = useParams();
    const N: number = Number(n);
    const FPS: number = Number(fps);

    const Algo: Algorithm = new Algorithm(N);
    const History: number[] = Algo.getHistory();

    document.documentElement.style.setProperty('--N',String(N));

    useStateArr = new Array(N);
    for(let i=0; i<N; i++){
        useStateArr[i] = new Array(N);
    }

    const changeTableValue = (r:number, c:number, value:number) => {
        useStateArr[r][c](value);
    }

    return (
        <div>
            <Table N={N}/>
            <button onClick={() => changeTableValue(1,1,1)} > [1][1]의 값을 1로 바꾸어주는 버튼 </button>
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
    useStateArr[row][column] = setValue;

    const style: string = ((row+column)%2==0) ? "black" : "white";
    const element: JSX.Element = (value==1) ? (<img src={require("../../img/LightQueen.webp")}></img>) : (<div></div>);
    return (
        <td className={style}>
            {/* {value} */}
            {element}
        </td>
    )
}

export default N_Queen_Simulator;
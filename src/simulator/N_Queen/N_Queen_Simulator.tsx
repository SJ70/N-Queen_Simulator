import { useParams } from 'react-router-dom';
import Algorithm from './N_Queen_Algorithm';

const N_Queen_Simulator = () => {
    const { n, fps } = useParams();
    const N: number = Number(n);
    const FPS: number = Number(fps);
    const Algo: Algorithm = new Algorithm(N);
    return (
        <div>
            시뮬레이터 컴포넌트
        </div>
    )
}

export default N_Queen_Simulator;
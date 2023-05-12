import Problem from '../class/Problem';
import Problems from '../class/Problems';
import { useParams } from "react-router-dom";

const Simulator = ({Probs}: {Probs:Problems}) => {
    const id: number = Number(useParams().id);
    return Probs.searchProblem(id).getComp();
}

export default Simulator;
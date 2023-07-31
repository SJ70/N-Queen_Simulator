import Problems from '../class/Problems';
import { useParams } from "react-router-dom";
import "../components/Restrict.css";

const Simulator = ({Probs}: {Probs:Problems}) => {
    const id: number = Number(useParams().id);
    return(
        <div className="Restrict">
            {Probs.searchProblem(id).getComp()}
        </div>
    ) 
}

export default Simulator;
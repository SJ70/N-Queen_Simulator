import './Menu.css';
import '../components/Restrict.css';
import Select from '../components/Select';
import Problems from '../class/Problems';

const Menu = ({Probs}: {Probs: Problems}) => {

  return (
    <div className="Restrict">
        <div className="Menu">
            {/* <sort></sort> */}
            {Probs.getProblems().map((prob,index) => (
              <Select prob={prob} key={index}/>
            ))}
        </div>
    </div>
  );
}

export default Menu;

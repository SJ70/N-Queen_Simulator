import { Link } from 'react-router-dom';
import { VscChevronLeft } from 'react-icons/vsc';
import './GoBack.css';

const GoBack = () => {
    return(
        <Link className="GoBack" to="..">
            <VscChevronLeft/>
        </Link>
    )
}

export default GoBack;
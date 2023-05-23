//loading status symbol function

//font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSave} from '@fortawesome/free-solid-svg-icons';

const loadingStatus = () => {
    return (
        <div className="loading status">
        <div className="loading__icon"><FontAwesomeIcon icon={faSpinner} spin /></div>
        </div>
    )
    }

const doneStatus = () => {
    return (
        <div className="done status" style={{color:"green"}}>
        <div className="done__icon"><FontAwesomeIcon icon={faSave} /></div>
        </div>
    )
    }

const failedStatus = () => {
    return (
        <div className="failed status" style={{color:"red"}}>
        <div className="failed__icon"><FontAwesomeIcon icon={faSave} /></div>
        </div>
    )
}

//exporting functions
export { loadingStatus, doneStatus, failedStatus };
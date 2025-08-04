import './NotFound.css';
import notFoundImage from '../assets/cat.png'; 

export default function NotFound() {
    return (
        <div className='layout'>
            <div className="container-error">
            <div className="error">
                404
            </div>
        <div className="img">
            <img src={notFoundImage} alt="Not Found" />
            <h1 className="okak">ОКАК</h1>
        </div>
        </div>
        </div>
        
    )
}
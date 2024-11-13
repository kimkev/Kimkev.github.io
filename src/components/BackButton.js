import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='button-container'>
            <button
                className="back-button"
                onClick={goBack}>
                Back
            </button>
        </div>

    );
}

export default BackButton;
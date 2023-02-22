import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        navigate(-1);
    };

    if (location.pathname === '/' ||
        (location.pathname.toLowerCase()) === '/home' ||
        (location.pathname.toLowerCase()) === '/app'  ||
        (location.pathname.toLowerCase()) === '/app/') {
        return null;
    }

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
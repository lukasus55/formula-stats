import { RotateCcw } from 'lucide-react';
import './LoadingError.css';

function LoadingError() {
    return (
        <div className="laoding-error">
            <div className="laoding-error-container" onClick={() => window.location.reload()}>
                <div className="laoding-error-text">Something went wrong</div>
                <div className="laoding-error-button">Reload&nbsp;<RotateCcw size='14px'/></div>
            </div>
        </div>
    );
}

export default LoadingError;
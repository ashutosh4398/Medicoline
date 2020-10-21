import React from 'react';

import './Loader.scss';

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner-border text-primary mx-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        
    );
};

export default Loader;
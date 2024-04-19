import React from 'react';

const Loader = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-secondary opacity-75" style={{ zIndex: 1000 }}>
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
};

export default Loader;

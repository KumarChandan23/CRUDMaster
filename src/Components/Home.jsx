import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container-fluid text-light px-3 py-5 border-bottom border-secondary'>
      <h1 className='text-center'>Welcome To Job Market</h1>
      <div className='text-center mt-5 d-flex flex-column flex-md-row justify-content-center gap-3'>
        {/* Link to Create Profile */}
        <Link to="/profileCreate">
          <button className='btn btn-success btn-lg'>Add Users</button>
        </Link>

        {/* Link to View Users */}
        <Link to="/users">
          <button className='btn btn-primary btn-lg'>Existing Users</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

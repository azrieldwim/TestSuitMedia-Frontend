import React from 'react';
import { Header } from '../components';

const Blank = () => {
  return (
    <div>
      <Header />
      <div className='flex items-center justify-center h-screen'>
        <div className='p-5 text-center text-4xl'>Under Development</div>
      </div>
    </div>
  );
}

export default Blank;
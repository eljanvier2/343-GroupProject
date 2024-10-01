import React from 'react';
import Frame1 from './LandingPage/Frame1/frame1';

interface IndexComponentProps {
}

const IndexComponent = ({}: IndexComponentProps): JSX.Element => {
  return (
    <div className='flex flex-col justify-center'>
        <Frame1 />
    </div>
  );
}

export default IndexComponent;
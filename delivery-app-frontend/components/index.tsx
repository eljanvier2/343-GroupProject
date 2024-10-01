import React from 'react';
import Frame1 from './Frame1/frame1';

interface IndexComponentProps {
}

const IndexComponent = ({}: IndexComponentProps): JSX.Element => {
  return (
    <div className='flex flex-col justify-center space-y-16 pt-16'>
        <Frame1 />
    </div>
  );
}

export default IndexComponent;
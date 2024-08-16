import React from 'react';
import { Bars } from 'react-loader-spinner';

const FullScreenLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <Bars
            height={80}
            width={80}
            color="grey"
            ariaLabel="bars-loading"
            visible={true}
            wrapperClass="loader-wrapper"
        />
    </div>
  )

  export default FullScreenLoader;




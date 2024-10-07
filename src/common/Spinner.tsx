import React from 'react';
import { Oval } from 'react-loader-spinner';

const FullScreenLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Oval
            height={80}
            width={80}
            color="#d3d3d3"
            visible={true}
            ariaLabel={"oval-loading"}
            wrapperClass="loader-wrapper"
            secondaryColor="#d3d3d3"
            
        />
    </div>
)

export default FullScreenLoader;

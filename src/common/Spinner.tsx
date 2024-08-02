import React from 'react';
import { Circles } from 'react-loader-spinner';

const FullScreenLoader = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        zIndex: 9999,
    }}>
        <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
        />
    </div>
);

export default FullScreenLoader;

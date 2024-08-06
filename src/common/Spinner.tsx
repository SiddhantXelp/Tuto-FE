// import React, { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const FullScreenLoader = () => {
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState(null);
  


//     return(
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h1><Skeleton /></h1>
//     </div>

// );
//     }
// export default FullScreenLoader;
// import React from 'react';
// import { Dots } from 'react-activity';
// import 'react-activity/dist/library.css';
// import { render } from "react-dom";


// interface FullScreenLoaderProps {
//   loading: boolean;
// }

// const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ loading }) => {
// //   if (!loading) return null;

//   return (
//     <div>
//         <Dots size={32} color="#000" />
//     </div>
//   );
// };

// export default FullScreenLoader;
import React from 'react';
import Bounce from 'react-activity/dist/Dots';
import 'react-activity/dist/Dots.css';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
      <Bounce size={60} color="#000" />
    </div>
  );
};

export default FullScreenLoader;




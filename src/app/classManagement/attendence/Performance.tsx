// "use client";
// import SearchComponent from '@/common/SearchComponent';
// import Table from '@/components/table';
// import { allStudentsColumns, allStudentsData } from '../../studentsTable/data';
// import React from 'react';

// const cardData = [
//   { percentage: '100%', value: 100, label: 'Total Classes' },
//   { percentage: '75%', value: 75, label: 'Regular' },
//   { percentage: '18%', value: 18, label: 'Irregular' },
//   { percentage: '7%', value: 7, label: 'Leaves' },
// ];

// const SubjectsBasedTable = () => {
//   return (
//     <div className="m-5">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
//         {cardData.map((card, index) => (
//           <div key={index} className="p-6 bg-white rounded-lg shadow-md flex flex-col">
//             <h2 className="text-lg  text-[#707070] mb-1 justify-end flex opacity-100">{card.percentage}</h2>
//             <h3 className="text-3xl font-bold text-[#707070] mb-2 justify-center flex">{card.value}</h3>
//             <p className="text-[#707070] flex  justify-end">{card.label}</p>
//           </div>
//         ))}
//       </div>

//       <div className="w-full overflow-x-auto">
//         <Table columns={allStudentsColumns} data={allStudentsData} includeCheckbox={false} />
//       </div>
//     </div>
//   );
// };

// export default SubjectsBasedTable;


"use client";
import SearchComponent from '@/common/SearchComponent';
import Table from '@/components/table';
import { allStudentsColumns, allStudentsData, performanceColumns } from './leastAttendanceData';
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

// Define card data
const cardData = [
    { percentage: '100%', value: 100, label: 'Total Classes' },
    { percentage: '75%', value: 75, label: 'Regular' },
    { percentage: '18%', value: 18, label: 'Irregular' },
    { percentage: '7%', value: 7, label: 'Leaves' },
];


const handleChange = () => {

}

const SubjectsBasedTable = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setSelectedCard(index);
    };

    return (
        <div className="m-5 flex flex-col">
            {selectedCard === null ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {cardData.map((card, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-md flex flex-col cursor-pointer"
                                onClick={() => handleCardClick(index)}
                            >
                                <h2 className="text-lg text-[#707070] mb-1 justify-end flex opacity-100">{card.percentage}</h2>
                                <h3 className="text-5xl font-bold text-[#707070] mb-2 justify-center flex">{card.value}</h3>
                                <p className="text-[#707070] flex justify-end">{card.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full overflow-x-auto">
                        <Table columns={performanceColumns} data={allStudentsData} includeCheckbox={false} showRowColor={true} border={"rounded-2xl"}/>
                    </div>
                </>
            ) : (
                <div className="flex flex-col p-2 ">
                    <div className="w-60 max-w-md  bg-white rounded-lg shadow-md flex items-center pl-5 p-2">
                        <h3 className="text-3xl font-bold text-[#707070] mb-2">{cardData[selectedCard].value}</h3>
                        <p className="text-[#707070] pl-5">{cardData[selectedCard].label}</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-end mr-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-64">
                                    <SearchComponent onSearch={handleChange} />
                                </div>
                            </div>
                        </div>
                        <Table columns={performanceColumns} data={allStudentsData} includeCheckbox={false} showRowColor={true} border={"rounded-b-2xl rounded-tl-2xl"}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectsBasedTable;

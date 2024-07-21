// 'use client';

// import { Dispatch, SetStateAction, useState } from 'react';
// import { Dialog, DialogPanel } from '@headlessui/react';
// import SelectWithCheckboxes from '@/common/SelectWithCheckboxes';
// import TextAreaInput from '@/common/TextAreaInput';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import InputMain from './InputMain';
// import FileInputWithIcon from '@/common/FileInputWithIcon';

// interface DialogComponentProps {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// interface ButtonItem {
//   id: number;
//   name: string;
// }

// interface FormData {
//   typeMeeting: string[];
//   classTitle?: string;
//   subject?: string;
//   students?: string;
//   material?: string;
//   description?: string;
//   scheduleStartDate?: string;
//   scheduleStartTime?: string;
//   scheduleEndTime?: string;
//   selectedOptions?: string[];
// }

// const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
//   const buttons: ButtonItem[] = [
//     { id: 1, name: 'Zoom' },
//     { id: 2, name: 'Google meet' },
//   ];

//   const options = [
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//   ];

//   const Tabbuttons: ButtonItem[] = [
//     { id: 1, name: 'Create new class' },
//     { id: 2, name: 'Virtual platform' },
//   ];

//   const [formData, setFormData] = useState<FormData>({
//     typeMeeting: [],
//     selectedOptions: [],
//   });
//   const [tabValue, setTabValue] = useState('Create new class');

//   const [showNewContent, setShowNewContent] = useState(false);

//   const handleAddClick = () => {
//     setShowNewContent(true);
//   };

//   const handleTabClick = (name: string) => {
//     setTabValue(name);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (value: string) => {
//     setFormData(prevFormData => {
//       const newSelectedDays = prevFormData.typeMeeting.includes(value)
//         ? prevFormData.typeMeeting.filter(day => day !== value)
//         : [...prevFormData.typeMeeting, value];
//       return {
//         ...prevFormData,
//         typeMeeting: newSelectedDays,
//       };
//     });
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         material: file.name,
//       }));
//     }
//   };

//   const handleSelectChange = (options: string[]) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       selectedOptions: options,
//     }));
//   };

//   return (
//     <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//       <div className="fixed inset-0 z-10 flex items-center justify-center">
       
    
//         <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
//           <div className="flex flex-row p-1 gap-1">
//             {Tabbuttons.map((item) => (
//               <button
//                 key={item.id}
//                 className={`h-20 w-full rounded-lg ${tabValue === item.name ? 'bg-gray-500' : 'bg-white'}`}
//                 onClick={() => handleTabClick(item.name)}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>
//           <div className='p-5'>
//             {tabValue === 'Create new class' && (
//               <form>
//                 <div>
//                   <p className='text-buttonGray text-sm'>Virtual platform</p>
//                   <div className="grid grid-cols-5 gap-2">
//                     {buttons.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         className={`border-buttonGray border-solid border-2 w-26 h-10 rounded-md ${
//                           formData.typeMeeting.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
//                         }`}
//                         onClick={() => handleCheckboxChange(item.name)}
//                       >
//                         <p className='text-sm text-buttonGray'>{item.name}</p>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <p className='text-sm text-buttonGray'>Schedule</p>
//                   <div className='flex flex-row gap-5'>
//                     <div className='flex flex-row gap-4'>
//                        <input
//                         type="date"
//                         name="scheduleStartDate"
//                         value={formData.scheduleStartDate || ''}
//                         onChange={handleInputChange}
//                         className="border-buttonGray border-solid border-2 w-26 h-10 rounded-md text-sm"
//                       /> 
//                        <input
//                         type="time"
//                         name="scheduleStartTime"
//                         value={formData.scheduleStartTime || ''}
//                         onChange={handleInputChange}
//                         className="border-buttonGray border-solid border-2 w-26 h-10 rounded-md text-sm"
//                       /> 

//                       <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
//                       <p className='text-sm text-buttonGray p-2'>June 7, 2023</p>  

//                       </button>
//                       <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
//                       <p className='text-sm text-buttonGray p-2'>6:30pm</p>  

//                       </button>

//                     </div>
//                     <div className='flex flex-row gap-4 ml-10'>
//                       <span className='p-2 text-buttonGray text-sm'>to</span>
//                       <input
//                         type="time"
//                         name="scheduleEndTime"
//                         value={formData.scheduleEndTime || ''}
//                         onChange={handleInputChange}
//                         className="border-buttonGray border-solid border-2 w-30 h-10 rounded-md text-sm"
//                       />
//                       <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
//                       <p className='text-sm text-buttonGray p-2'>7:30pm</p>  

//                       </button>

//                       <div className="">
//                         <SelectWithCheckboxes
//                           options={options}
//                           selectedOptions={formData.selectedOptions || []}
//                           setSelectedOptions={handleSelectChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className='text-sm text-buttonGray'>Video call link</p>
//                   <div className='w-full h-16 border-2 border-gray-400 bg-white rounded-md flex items-center p-2'>
//                     <p className='text-sm text-buttonGray'>https://react-icons.github.io/react-icons/search/#q=cop</p>
//                     <p className='ml-auto flex items-center'><MdOutlineContentCopy /></p>
//                   </div>
//                 </div>
//                 <div className='mt-4'>
//                   <span className='text-sm text-buttonGray'>Description</span>
//                   <TextAreaInput
//                     name="description"
//                     value={formData.description || ''}
//                     onChange={handleInputChange}
//                     placeholder="Enter your text here..."
//                     rows={6}
//                     cols={60}
//                   />
//                 </div>
//                 <div className='mt-8'>
//                   <button type="submit" className='w-full bg-buttonGray h-12 rounded-md text-white'>Create</button>
//                 </div>
//               </form>
//             )}
//             {tabValue === 'Virtual platform' && (
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Class title</label>
//                   <InputMain
//                     name="classTitle"
//                     value={formData.classTitle || ''}
//                     onChange={handleInputChange}
//                     placeholder="Enter class title"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Subject</label>
//                   <InputMain
//                     name="subject"
//                     value={formData.subject || ''}
//                     onChange={handleInputChange}
//                     placeholder="Select type of class"
//                   />
//                 </div>
//                 <div className="mb-4 flex justify-between items-center">
//                   <div className="w-full">
//                     <div className='flex flex-row'>
//                       <label className="block text-gray-700 mb-2">Students</label>
//                       <div className="ml-auto text-blue-500 cursor-pointer">
//                         <span>+ Add Student</span>
//                       </div>
//                     </div>
//                     <InputMain
//                       name="students"
//                       value={formData.students || ''}
//                       onChange={handleInputChange}
//                       placeholder="Choose students"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4 flex items-center">
//                   <div className="w-full">
//                     <label className="block text-gray-700 mb-2">Material</label>
//                     <FileInputWithIcon
//                       icon={<MdOutlineContentCopy color='gray' />}
//                       placeholder="Upload or enter material name"
//                       onChange={handleFileChange}
//                       name="material"
//                     />
//                   </div>
//                 </div>
//                 <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded">Next</button>
//               </form>
//             )}
//           </div>
//         </DialogPanel>

//       </div>
//     </Dialog>
//   );
// };

// export default DialogComponent;
// onClick={() => setShowNewContent(true)}
'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import SelectWithCheckboxes from '@/common/SelectWithCheckboxes';
import TextAreaInput from '@/common/TextAreaInput';
import { MdOutlineContentCopy } from 'react-icons/md';
import InputMain from './InputMain';
import FileInputWithIcon from '@/common/FileInputWithIcon';
import SearchComponent from '@/common/SearchComponent';
import SelectMain from './SelectMain';


interface DialogComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ButtonItem {
  id: number;
  name: string;
}

interface FormData {
  typeMeeting: string[];
  classTitle?: string;
  subject?: string;
  students?: string;
  material?: string;
  description?: string;
  scheduleStartDate?: string;
  scheduleStartTime?: string;
  scheduleEndTime?: string;
  selectedOptions?: string[];
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
  const buttons: ButtonItem[] = [
    { id: 1, name: 'Zoom' },
    { id: 2, name: 'Google meet' },
  ];

  const options = [
    { label: 'Every day', value: 'Everyday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },



  ];

  const Selectoptions = [
    {
      label: "Filter",
      name: "Filter",
      Optionlabel:"",
      options: [
        { label: "English", value: "English" },
        { label: "Social", value: "Social" },
        { label: "GroupA", value: "GroupA" },
        { label: "Group B", value: "Group B" },
      ],
    },
    
  ]

  const SubjectOPtions = [
    {
      label: "Subject",
      name: "Subject",
      lablename:"Select Subjects",
      Optionlabel:"",
      options: [
        { label: "English", value: "English" },
        { label: "Social", value: "Social" },
        { label: "GroupA", value: "GroupA" },
        { label: "Group B", value: "Group B" },
      ],
    },
    
  ]



  const StudentOPtions = [
    {
      label: "Students",
      name: "Students",
      lablename:"Select type of class",
      Optionlabel:"",
      options: [
        { label: "Select all", value: "Select all" },
        { label: "Group A", value: "Group A" },
        { label: "Group B", value: "Group B" },
        { label: "Physics", value: "Physics" },
        { label: "Maths", value: "Maths" },

      ],
    },
    
  ]



  const Tabbuttons: ButtonItem[] = [
    { id: 1, name: 'Create new class' },
    { id: 2, name: 'Virtual platform' },
  ];

  const [formData, setFormData] = useState<FormData>({
    typeMeeting: [],
    selectedOptions: [],
  });
  const [tabValue, setTabValue] = useState('Create new class');
  const [showNewContent, setShowNewContent] = useState(false);

  const handleTabClick = (name: string) => {
    setTabValue(name);
  };

  const [devdata, setDevdata] = useState({
    searchQuery: '',
    filter: {}
  });

  // Handle the change for SearchComponent and SelectMain
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the change specifically for SelectMain options
  const handleSelectChangedev = (name:string, value:any) => {
    setDevdata((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [name]: value
      }
    }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prevFormData => {
      const newSelectedDays = prevFormData.typeMeeting.includes(value)
        ? prevFormData.typeMeeting.filter(day => day !== value)
        : [...prevFormData.typeMeeting, value];
      return {
        ...prevFormData,
        typeMeeting: newSelectedDays,
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFormData(prevFormData => ({
        ...prevFormData,
        material: file.name,
      }));
    }
  };

  const handleSelectChange = (options: string[]) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      selectedOptions: options,
    }));
  };
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        {showNewContent ? (
          <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
            <div className='p-12'>
              <div className='flex justify-center items-cente'>
              <span className='font-medium text-xl text-buttonGray block mb-4'> +Add student</span>

              </div>
            <SearchComponent onSearch={handleChange} />
           
           <div className='mt-2 '>
           {Selectoptions.map((option) => (
           <SelectMain
            key={option.name}
            label={option.label}
            name={option.name}
            Optionlabel={"Selecting class"}
            options={option.options}
            value={devdata.filter[option.name]}
            onChange={(value) => handleSelectChangedev(option.name, value)}
          />
        ))}
             </div>

  <div className='p-1 mt-4'>   
    <span className='text-buttonGray '>Result</span> 
  <table className="w-full  border border-buttonGray rounded-md">
    <thead>
      {/* <tr className="bg-gray-300 w-full h-14">
        <th className="px-4 py-2 text-left">Song</th>
        <th className="px-4 py-2 text-left">Artist</th>
        <th className="px-4 py-2 text-left">Year</th>
      </tr> */}
    </thead>
    <tbody>
      <tr className="bg-gray-100 w-full h-14 border-b-1 border-buttonGray ">
        <td className="px-4 py-2 text-buttonGray">1. Suresh</td>
        <td className="px-4 py-2 text-buttonGray">5th grade</td>
        <td className="px-4 py-2 text-buttonGray">Group C</td>
      </tr>
      <tr className="bg-gray-50 w-full h-14  border-buttonGray border-b-1 ">
        <td className="px-4 py-2 text-buttonGray">1. Suresh</td>
        <td className="px-4 py-2 text-buttonGray">5th grade</td>
        <td className="px-4 py-2 text-buttonGray">Group C</td>
      </tr>
      <tr className="bg-white w-full h-16">
        
      </tr>
     
    </tbody>
  </table>
</div>


            <button
              onClick={() => setShowNewContent(false)}
              className='bg-buttonGray w-full h-12 mt-4 text-white'
            >
              Add
            </button>
            </div>
          </DialogPanel>
        ) : (
         <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
          <div className="flex flex-row p-0 gap-1">
            {Tabbuttons.map((item) => (
              <button
                key={item.id}
                className={`h-20 w-full rounded-lg ${tabValue === item.name ? 'bg-white' : 'bg-buttonGray'}`}
                onClick={() => handleTabClick(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className='p-5'>
            {tabValue === 'Create new class' && (
              // <form>
              //   <div>
              //     <p className='text-buttonGray text-sm'>Virtual platform</p>
              //     <div className="grid grid-cols-5 gap-2">
              //       {buttons.map((item) => (
              //         <button
              //           key={item.id}
              //           type="button"
              //           className={`border-buttonGray border-solid border-2 w-26 h-10 rounded-md ${
              //             formData.typeMeeting.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
              //           }`}
              //           onClick={() => handleCheckboxChange(item.name)}
              //         >
              //           <p className='text-sm text-buttonGray'>{item.name}</p>
              //         </button>
              //       ))}
              //     </div>
              //   </div>
              //   <div>
              //     <p className='text-sm text-buttonGray'>Schedule</p>
              //     <div className='flex flex-row gap-5'>
              //       <div className='flex flex-row gap-4'>
                       

              //         <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
              //         <p className='text-sm text-buttonGray p-2'>June 7, 2023</p>  

              //         </button>
              //         <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
              //         <p className='text-sm text-buttonGray p-2'>6:30pm</p>  

              //         </button>

              //       </div>
              //       <div className='flex flex-row gap-4 ml-10'>
              //         <span className='p-2 text-buttonGray text-sm'>to</span>
                    
              //         <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
              //         <p className='text-sm text-buttonGray p-2'>7:30pm</p>  

              //         </button>

              //         <div className="">
              //           <SelectWithCheckboxes
              //             options={options}
              //             selectedOptions={formData.selectedOptions || []}
              //             setSelectedOptions={handleSelectChange}
              //           />
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              //   <div>
              //     <p className='text-sm text-buttonGray'>Video call link</p>
              //     <div className='w-full h-16 border-2 border-gray-400 bg-white rounded-md flex items-center p-2'>
              //       <p className='text-sm text-buttonGray'>https://react-icons.github.io/react-icons/search/#q=cop</p>
              //       <p className='ml-auto flex items-center'><MdOutlineContentCopy /></p>
              //     </div>
              //   </div>
              //   <div className='mt-4'>
              //     <span className='text-sm text-buttonGray'>Description</span>
              //     <TextAreaInput
              //       name="description"
              //       value={formData.description || ''}
              //       onChange={handleInputChange}
              //       placeholder="Enter your text here..."
              //       rows={6}
              //       cols={60}
              //     />
              //   </div>
              //   <div className='mt-8'>
              //     <button type="submit" className='w-full bg-buttonGray h-12 rounded-md text-white'>Create</button>
              //   </div>
              // </form>
              <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Class title</label>
                <InputMain
                  name="classTitle"
                  value={formData.classTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Enter class title"
                />
              </div>
              <div className="mb-4">
                {/* <label className="block text-gray-700 mb-2">Subject</label> */}
                {SubjectOPtions.map((option) => (
                  <SelectMain
                    key={option.name}
                    label={option.label}
                    name={option.name}
                    lablename={option.lablename}
                    Optionlabel={option.Optionlabel}
                    options={option.options}
                    value={formData[option.name]}
                    onChange={(value) => handleChange({ target: { name: option.name, value } })}
                  />
                ))}
              </div>
              <div className="mb-4 flex justify-between items-center">
                <div className="w-full">
                  <div className='flex flex-row'>
                    {/* <label className="block text-gray-700 mb-2">Students</label> */}
                    <div className="ml-auto text-blue-500 cursor-pointer">
                      <span onClick={() => setShowNewContent(true)}>+ Add Student</span>
                    </div>
                  </div>
                  {StudentOPtions.map((option) => (
                    <SelectMain
                      key={option.name}
                      label={option.label}
                      name={option.name}
                      lablename={option.lablename}
                      Optionlabel={option.Optionlabel}
                      options={option.options}
                      value={formData[option.name]}
                      onChange={(value) => handleChange({ target: { name: option.name, value } })}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <div className="w-full">
                  <label className="block text-gray-700 mb-2">Material</label>
                  <FileInputWithIcon
                    icon={<MdOutlineContentCopy color='gray' />}
                    placeholder="Upload or enter material name"
                    onChange={handleFileChange}
                    name="material"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded">Next</button>
            </form>

            )}
            {tabValue === 'Virtual platform' && (
              // <form>
              //   <div className="mb-4">
              //     <label className="block text-buttonGray mb-2">Class title</label>
              //     <InputMain
              //       name="classTitle"
              //       value={formData.classTitle || ''}
              //       onChange={handleInputChange}
              //       placeholder="Enter class title"
              //     />
              //   </div>
              //   <div className="mb-4">
              //   {SubjectOPtions.map((option) => (
              //    <SelectMain
              //       key={option.name}
              //       label={option.label}
              //         name={option.name}
              //         lablename={option.lablename}
              //          options={option.options}
              //           value={devdata.filter[option.name]}
              //          onChange={(value) => handleSelectChangedev(option.name, value)}
              //           />
              //          ))}
              //       </div>
              //      <div className="mb-4 flex justify-between items-center">
              //     <div className="w-full">
              //       <div className='flex flex-row'>
              //         <div className="ml-auto text-blue-500 cursor-pointer">
              //           <span onClick={() => setShowNewContent(true)}>+ Add Student</span>
              //         </div>
              //       </div>
              //       {StudentOPtions.map((option) => (
              //       <SelectMain
              //        key={option.name}
              //         label={option.label}
              //         name={option.name}
              //         Optionlabel={option.lablename}
              //          options={option.options}
              //           value={devdata.filter[option.name]}
              //          onChange={(value) => handleSelectChangedev(option.name, value)}
              //           />
              //          ))}
              //     </div>
              //   </div>
              //   <div className="mb-4 flex items-center">
              //     <div className="w-full">
              //       <label className="block text-gray-700 mb-2">Material</label>
              //       <FileInputWithIcon
              //         icon={<MdOutlineContentCopy color='gray' />}
              //         placeholder="Upload or enter material name"
              //         onChange={handleFileChange}
              //         name="material"
              //       />
              //     </div>
              //   </div>
              //   <button type="submit" className="w-full bg-buttonGray text-white py-2 rounded h-16">Next</button>
              // </form>

              <form>
              <div>
                <p className='text-buttonGray text-sm'>Virtual platform</p>
                <div className="grid grid-cols-5 gap-2">
                  {buttons.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`border-buttonGray border-solid border-2 w-26 h-10 rounded-md ${
                        formData.typeMeeting.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                      onClick={() => handleCheckboxChange(item.name)}
                    >
                      <p className='text-sm text-buttonGray'>{item.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className='text-sm text-buttonGray'>Schedule</p>
                <div className='flex flex-row gap-5'>
                  <div className='flex flex-row gap-4'>
                     

                    <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                    <p className='text-sm text-buttonGray p-2'>June 7, 2023</p>  

                    </button>
                    <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                    <p className='text-sm text-buttonGray p-2'>6:30pm</p>  

                    </button>

                  </div>
                  <div className='flex flex-row gap-4 ml-10'>
                    <span className='p-2 text-buttonGray text-sm'>to</span>
                  
                    <button className='`border-buttonGray border-solid border-2 w-26 h-10 rounded-md'>
                    <p className='text-sm text-buttonGray p-2'>7:30pm</p>  

                    </button>

                    <div className="">
                      <SelectWithCheckboxes
                        options={options}
                        selectedOptions={formData.selectedOptions || []}
                        setSelectedOptions={handleSelectChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className='text-sm text-buttonGray'>Video call link</p>
                <div className='w-full h-16 border-2 border-gray-400 bg-white rounded-md flex items-center p-2'>
                  <p className='text-sm text-buttonGray'>https://react-icons.github.io/react-icons/search/#q=cop</p>
                  <p className='ml-auto flex items-center'><MdOutlineContentCopy /></p>
                </div>
              </div>
              <div className='mt-4'>
                <span className='text-sm text-buttonGray'>Description</span>
                <TextAreaInput
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your text here..."
                  rows={6}
                  cols={60}
                />
              </div>
              <div className='mt-8'>
                <button type="submit" className='w-full bg-buttonGray h-12 rounded-md text-white'>Create</button>
              </div>
            </form>

              // <form>
              //   <div className="mb-4">
              //     <label className="block text-gray-700 mb-2">Class title</label>
              //     <InputMain
              //       name="classTitle"
              //       value={formData.classTitle || ''}
              //       onChange={handleInputChange}
              //       placeholder="Enter class title"
              //     />
              //   </div>
              //   <div className="mb-4">
              //     {/* <label className="block text-gray-700 mb-2">Subject</label> */}
              //     {SubjectOPtions.map((option) => (
              //       <SelectMain
              //         key={option.name}
              //         label={option.label}
              //         name={option.name}
              //         lablename={option.lablename}
              //         Optionlabel={option.Optionlabel}
              //         options={option.options}
              //         value={formData[option.name]}
              //         onChange={(value) => handleChange({ target: { name: option.name, value } })}
              //       />
              //     ))}
              //   </div>
              //   <div className="mb-4 flex justify-between items-center">
              //     <div className="w-full">
              //       <div className='flex flex-row'>
              //         {/* <label className="block text-gray-700 mb-2">Students</label> */}
              //         <div className="ml-auto text-blue-500 cursor-pointer">
              //           <span onClick={() => setShowNewContent(true)}>+ Add Student</span>
              //         </div>
              //       </div>
              //       {StudentOPtions.map((option) => (
              //         <SelectMain
              //           key={option.name}
              //           label={option.label}
              //           name={option.name}
              //           lablename={option.lablename}
              //           Optionlabel={option.Optionlabel}
              //           options={option.options}
              //           value={formData[option.name]}
              //           onChange={(value) => handleChange({ target: { name: option.name, value } })}
              //         />
              //       ))}
              //     </div>
              //   </div>
              //   <div className="mb-4 flex items-center">
              //     <div className="w-full">
              //       <label className="block text-gray-700 mb-2">Material</label>
              //       <FileInputWithIcon
              //         icon={<MdOutlineContentCopy color='gray' />}
              //         placeholder="Upload or enter material name"
              //         onChange={handleFileChange}
              //         name="material"
              //       />
              //     </div>
              //   </div>
              //   <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded">Next</button>
              // </form>
            )}
          </div>
        </DialogPanel>

        )}
      </div>
    </Dialog>
  );
};

export default DialogComponent;

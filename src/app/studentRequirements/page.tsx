// "use client";
// import React, { useState, ChangeEvent, useEffect } from 'react';
// import SelectMain from '@/common/SelectMain';
// import Link from 'next/link';
// import TabNavigator from "../TabNavigator/page";
// import { useRouter } from 'next/navigation';
// import SelectWithCheckboxes from '@/common/SelectWithCheckboxesFull';
// import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
// import { getCreateUser, setCreateUser } from "@/app/store/actions/auth";
// import Spinner from "../../common/Spinner"
// import { toast } from 'react-toastify';

// const options = [
//   {
//     label: "Grade",
//     name: "grade",
//     options: [
//       { label: "Nursery/pre-KG", value: "Nursery/pre-KG" },
//       { label: "Kindergarten/KG", value: "Kindergarten/KG" },
//       { label: "Primary School(Grade 1-5)", value: "Primary School(Grade 1-5)" },
//       { label: "Secondary School(9-10)", value: "Secondary School(9-10)" },
//     ],
//   },
//   {
//     label: "Board education",
//     name: "boardeducation",
//     options: [
//       { label: "CBSE", value: "CBSE" },
//       { label: "ICSE", value: "ICSE" },
//       { label: "State Board", value: "State Board" },
//     ],
//   },
// ];

// const StudentRequirementForm: React.FC = () => {

//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [subjects, setSubjects] = useState<string[]>([]);
//   const [next, setNext] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const data: Record<string, string> = {};

//     Array.from(params.entries()).forEach(([key, value]) => {
//       data[key] = value;
//     });

//     setFormData(data);
//   }, [router]);


//   const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({
//     grade: '',
//     subjects: '',
//     boardeducation: ''
//   });

//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setSelectedOptions((prevSelectedOptions) => ({
//       ...prevSelectedOptions,
//       [name]: value
//     }));
//   };

//   const handleSelectChange = (options: string[]) => {
//     setSubjects(options);
//   };


//   const handelSubjects = [
//     { label: "English", value: "English" },
//     { label: "Mathematics", value: "Mathematics" },
//     { label: "Science", value: "Science" },
//     { label: "Social Studies", value: "Social Studies" },
//     { label: "Hindi", value: "Hindi" },
//     { label: "Second Language", value: "Second Language" },
//     { label: "Art/Music", value: "Art/Music" },
//     { label: "Computer Science/Information Technology", value: "Computer Science/Information Technology" },
//     { label: "Environmental Studies", value: "Environmental Studies" },
//     { label: "Moral Science", value: "Moral Science" },

//   ];

//   const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);

//   const validateForm = () => {
//     const { name, gender, dob, email } = formData;
//     let hasError = false;
//     let newErrors: string[] = [];

//     if (!name) {
//       newErrors.push("Name is required.");
//       hasError = true;
//     }
//     if (!gender) {
//       newErrors.push("Gender is required.");
//       hasError = true;
//     }
//     if (!dob) {
//       newErrors.push("Date of Birth is required.");
//       hasError = true;
//     }
//     if (!email) {
//       newErrors.push("Email is required.");
//       hasError = true;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.push("Please enter a valid email address.");
//       hasError = true;
//     }

//     if (!selectedOptions.grade) {
//       newErrors.push("Grade is required.");
//       hasError = true;
//     }

//     if (!selectedOptions.boardeducation) {
//       newErrors.push("Board of Education is required.");
//       hasError = true;
//     }

//     if (subjects.length === 0) {
//       newErrors.push("At least one subject must be selected.");
//       hasError = true;
//     }

//     if (hasError) {
//       newErrors.forEach(error => toast.error(error));
//       return false;
//     }
//     return true;
//   };

//   const handelSubmit = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const data = {
//       "username": formData.email,
//       "email": formData.email,
//       "phoneNumber": formData.mobileNumber,
//       // "phoneNumber": 1234567890,
//       "password": "password123",
//       "fullName": formData.name,
//       "gender": formData.gender,
//       "dateOfBirth": formData.dob,
//       "currentStatus": "ACTIVE",
//       "employmentStatus": "FT",
//       "educationalDetails": {
//         "grade": selectedOptions.grade,
//         "subjects": subjects,
//         "boardOfEducation": selectedOptions.boardeducation
//       },
//       "roleId": "ec01e266-c6ed-49da-acff-9a49f5a6a7d6"
//     }


//     dispatch(getCreateUser(memberAuthToken, data));
//   }


//   const classesData = useAppSelector((state: { auth: any }) => state.auth.createUser);

//   useEffect(() => {
//     if (classesData && classesData?.id) {

//       router.push(`/createPackage/${classesData?.id}`);

//     }
//   }, [classesData, router]);
//   const isLoading = useAppSelector(state => state.auth.loading);
//   const isError = useAppSelector(state => state.auth.error);


//   useEffect(() => {

//     if (isError) {
//       console.log(isError, "::::::::::::isError");

//       toast.error(isError)

//     }
//   }, [isError])


//   return (
//     <>
//       <TabNavigator>
//         {
//           isLoading ? <Spinner /> : ""
//         }
//         <div className='flex justify-center items-center mt-20 '>
//           <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
//             <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Student Requirements</span>

//             <div className='mt-10'>
//               {options.map((option) => (
//                 <SelectMain
//                   key={option.name}
//                   label={option.label}
//                   name={option.name}
//                   options={option.options}
//                   lablename={option.label}
//                   value={selectedOptions[option.name]}
//                   onChange={handleChange}
//                 />
//               ))}
//               <div className="mt-2 mb-5">
//                 <label className="block text-buttonGray text-sm mb-2">Subjects</label>

//                 <div className="w-full  h-12">
//                   <SelectWithCheckboxes
//                     options={handelSubjects}
//                     selectedOptions={subjects}
//                     setSelectedOptions={handleSelectChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button className='w-full bg-buttonGray h-10 rounded-md text-white' onClick={handelSubmit}>Next</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </TabNavigator>
//     </>
//   );
// };

// export default StudentRequirementForm;
"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getCreateUser } from "@/app/store/actions/auth";
import { toast } from 'react-toastify';

const SelectMain = dynamic(() => import('@/common/SelectMain'), { ssr: false });
const TabNavigator = dynamic(() => import('../TabNavigator/page'), { ssr: false });
const SelectWithCheckboxes = dynamic(() => import('@/common/SelectWithCheckboxesFull'), { ssr: false });
const Spinner = dynamic(() => import('../../common/Spinner'), { ssr: false });

const options = [
  {
    label: "Grade",
    name: "grade",
    options: [
      { label: "Nursery/pre-KG", value: "Nursery/pre-KG" },
      { label: "Kindergarten/KG", value: "Kindergarten/KG" },
      { label: "Primary School(Grade 1-5)", value: "Primary School(Grade 1-5)" },
      { label: "Secondary School(9-10)", value: "Secondary School(9-10)" },
    ],
  },
  {
    label: "Board education",
    name: "boardeducation",
    options: [
      { label: "CBSE", value: "CBSE" },
      { label: "ICSE", value: "ICSE" },
      { label: "State Board", value: "State Board" },
    ],
  },
];

const StudentRequirementForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [subjects, setSubjects] = useState<string[]>([]);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data: Record<string, string> = {};

    Array.from(params.entries()).forEach(([key, value]) => {
      data[key] = value;
    });

    setFormData(data);
  }, [router]);

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({
    grade: '',
    subjects: '',
    boardeducation: ''
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: value
    }));
  };

  const handleSelectChange = (options: string[]) => {
    setSubjects(options);
  };

  const handelSubjects = [
    { label: "English", value: "English" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Science", value: "Science" },
    { label: "Social Studies", value: "Social Studies" },
    { label: "Hindi", value: "Hindi" },
    { label: "Second Language", value: "Second Language" },
    { label: "Art/Music", value: "Art/Music" },
    { label: "Computer Science/Information Technology", value: "Computer Science/Information Technology" },
    { label: "Environmental Studies", value: "Environmental Studies" },
    { label: "Moral Science", value: "Moral Science" },
  ];

  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);

  const validateForm = () => {
    const { name, gender, dob, email } = formData;
    let hasError = false;
    let newErrors: string[] = [];

    if (!name) {
      newErrors.push("Name is required.");
      hasError = true;
    }
    if (!gender) {
      newErrors.push("Gender is required.");
      hasError = true;
    }
    if (!dob) {
      newErrors.push("Date of Birth is required.");
      hasError = true;
    }
    if (!email) {
      newErrors.push("Email is required.");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push("Please enter a valid email address.");
      hasError = true;
    }

    if (!selectedOptions.grade) {
      newErrors.push("Grade is required.");
      hasError = true;
    }

    if (!selectedOptions.boardeducation) {
      newErrors.push("Board of Education is required.");
      hasError = true;
    }

    if (subjects.length === 0) {
      newErrors.push("At least one subject must be selected.");
      hasError = true;
    }

    if (hasError) {
      newErrors.forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

  const handelSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      username: formData.email,
      email: formData.email,
      phoneNumber: formData.mobileNumber,
      password: "password123",
      fullName: formData.name,
      gender: formData.gender,
      dateOfBirth: formData.dob,
      currentStatus: "ACTIVE",
      employmentStatus: "FT",
      educationalDetails: {
        grade: selectedOptions.grade,
        subjects: subjects,
        boardOfEducation: selectedOptions.boardeducation
      },
      roleId: "ec01e266-c6ed-49da-acff-9a49f5a6a7d6"
    };

    dispatch(getCreateUser(memberAuthToken, data));
  };

  const classesData = useAppSelector((state: { auth: any }) => state.auth.createUser);

  useEffect(() => {
    if (classesData && classesData?.id) {
      router.push(`/createPackage/${classesData?.id}`);
    }
  }, [classesData, router]);

  const isLoading = useAppSelector(state => state.auth.loading);
  const isError = useAppSelector(state => state.auth.error);

  useEffect(() => {
    if (isError) {
      toast.error(isError); 
    }
  }, [isError]);

  return (
    <>
      <TabNavigator>
        {isLoading && <Spinner />}
        <div className='flex justify-center items-center mt-20 '>
          <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border rounded-[19px] p-6'>
            <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>Student Requirements</span>
            <div className='mt-10'>
              {options.map((option) => (
                <SelectMain
                  key={option.name}
                  label={option.label}
                  name={option.name}
                  options={option.options}
                  lablename={option.label}
                  value={selectedOptions[option.name]}
                  onChange={handleChange}
                />
              ))}
              <div className="mt-2 mb-5">
                <label className="block text-buttonGray text-sm mb-2">Subjects</label>
                <div className="w-full h-12">
                  <SelectWithCheckboxes
                    options={handelSubjects}
                    selectedOptions={subjects}
                    setSelectedOptions={handleSelectChange}
                  />
                </div>
              </div>
              <div>
                <button className='w-full bg-buttonGray h-10 rounded-md text-white' onClick={handelSubmit}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </TabNavigator>
    </>
  );
};

export default StudentRequirementForm;

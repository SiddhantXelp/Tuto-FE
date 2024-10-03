// "use client";
// import React, { useEffect, useState } from 'react';
// import TabNavigator from "../../TabNavigator/page";
// import MultipleSelection from '@/common/MultipleSelection';
// import { handelGrades, handelBoardEduction, handelSubjects } from "../educationDetails/data";
// import InputMain from '@/common/InputMain';
// import { useRouter, useSearchParams } from 'next/navigation';

// const StudentRequirementForm: React.FC = () => {
//     const router = useRouter();
//     const [skills, setSkills] = useState("");
//     const searchParams = useSearchParams();
//     const [queryParams, setQueryParams] = useState<Record<string, string>>({});

//     const [grade, setGrades] = useState<string[]>([]);
//     const [gradeIds, setGradeIds] = useState<string[]>([]);

//     const [boardEducation, setBoardEducation] = useState<string[]>([]);
//     const [boardEducationIds, setBoardEducationIds] = useState<string[]>([]);

//     const [subjects, setSubjects] = useState<string[]>([]);
//     const [subjectIds, setSubjectIds] = useState<string[]>([]);

//     const handleGradeChange = (selectedGrades: string[]) => {
//         setGrades(selectedGrades);
//     };

//     const handleBoardEducationChange = (selectedBoardEducation: string[]) => {
//         setBoardEducation(selectedBoardEducation);
//     };

//     const handleSubjectsChange = (selectedSubjects: string[]) => {
//         setSubjects(selectedSubjects);
//     };

//     const setGradeSelectedIds = (selectedIds: string[]) => {
//         setGradeIds(selectedIds);
//     };

//     const setBoardEducationSelectedIds = (selectedIds: string[]) => {
//         setBoardEducationIds(selectedIds);
//     };

//     const setSubjectSelectedIds = (selectedIds: string[]) => {
//         setSubjectIds(selectedIds);
//     };

//     const handleSubmit = () => {
//         console.log("Selected Grades:", grade);
//         console.log("Selected Board Education:", boardEducation);
//         console.log("Selected Subjects:", subjects);
//         // router.push(`/`);

//         // sessionStorage.removeItem('formData');
//         // sessionStorage.removeItem('educationDetails');

//         console.log(">>>>>>>>>>>>>>>Data", queryParams);


//     };

//     const optionsGrade = handelGrades?.map((group: any) => ({
//         id: group?.id,
//         label: group.label,
//         value: group.value
//     })) ?? [];

//     const optionsBoardEducation = handelBoardEduction?.map((group: any) => ({
//         id: group?.id,
//         label: group.label,
//         value: group.value
//     })) ?? [];

//     const optionsSubjects = handelSubjects?.map((group: any) => ({
//         id: group?.id,
//         label: group.label,
//         value: group.value
//     })) ?? [];


//     useEffect(() => {
//         const params: Record<string, string> = {};

//         searchParams.forEach((value, key) => {
//             params[key] = value;
//         });

//         setQueryParams(params);
//     }, [searchParams]);

//     return (
//         <>
//             <TabNavigator>
//                 <div className='flex justify-center items-center mt-20 '>
//                     <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
//                         <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>What areas or fields do you specialize in?</span>

//                         {/* Grade Selection */}
//                         <div className="mt-2 mb-5">
//                             <label className="block text-[#707070] text-[14px] mb-2">Grade</label>
//                             <div className="w-full">
//                                 <MultipleSelection
//                                     options={optionsGrade}
//                                     selectedOptions={grade}
//                                     setSelectedOptions={handleGradeChange}
//                                     setSelectedIds={setGradeSelectedIds} // Unique selected IDs for grades
//                                     selectedStudentId={gradeIds}
//                                     label={"Select Grade"}
//                                 />
//                             </div>
//                         </div>

//                         {/* Subjects Selection */}
//                         <div className="mt-2 mb-5">
//                             <label className="block text-[#707070] text-[14px] mb-2">Subjects</label>
//                             <div className="w-full">
//                                 <MultipleSelection
//                                     options={optionsSubjects}
//                                     selectedOptions={subjects}
//                                     setSelectedOptions={handleSubjectsChange}
//                                     setSelectedIds={setSubjectSelectedIds} // Unique selected IDs for subjects
//                                     selectedStudentId={subjectIds}
//                                     label={"Select Subjects"}
//                                 />
//                             </div>
//                         </div>

//                         {/* Board Education Selection */}
//                         <div className="mt-2 mb-5">
//                             <label className="block text-[#707070] text-[14px] mb-2">Board Education</label>
//                             <div className="w-full">
//                                 <MultipleSelection
//                                     options={optionsBoardEducation}
//                                     selectedOptions={boardEducation}
//                                     setSelectedOptions={handleBoardEducationChange}
//                                     setSelectedIds={setBoardEducationSelectedIds} // Unique selected IDs for board education
//                                     selectedStudentId={boardEducationIds}
//                                     label={"Select Board Eduction"}
//                                 />
//                             </div>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Skills</label>
//                             <InputMain
//                                 name="material"
//                                 value={skills || ''}
//                                 onChange={(e) => setSkills(e.target.value)}
//                                 placeholder="Add any skills like Music, Painting, Arts Etc..."
//                                 label=""
//                                 type=""
//                                 id=""
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <div className='mt-8'>
//                             <button className='w-full bg-[#D8D8D8] h-10 rounded-md text-[#707070] border border-[#707070] font-medium' onClick={handleSubmit}>Submit</button>
//                         </div>

//                     </div>
//                 </div>
//             </TabNavigator>
//         </>
//     );
// };

// export default StudentRequirementForm;


"use client";
import React, { useEffect, useState } from 'react';
import TabNavigator from "../../TabNavigator/page";
import MultipleSelection from '@/common/MultipleSelection';
import { handelGrades, handelBoardEduction, handelSubjects } from "../educationDetails/data";
import InputMain from '@/common/InputMain';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getSubjects } from '@/app/store/actions/assignment';
import { getOnBoardTutor, setOnBoardTutor } from '@/app/store/actions/user';
import { toast } from 'react-toastify';

const StudentRequirementForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state?.auth?.login);
    const ReceivedSubjects = useAppSelector(state => state?.assignment?.setSubjects?.data || []);
    const ReceivedOnBoardTutor = useAppSelector(state => state?.user?.setOnBoardTutor || []);

    useEffect(() => {
        if (ReceivedOnBoardTutor?.status === true) {
            Swal.fire({
                title: 'Success!',
                text: 'Tutor On Board Successfully',
                icon: 'success',
                confirmButtonText: 'Done'
            });

            router.push("/");
            dispatch(setOnBoardTutor(null));
        }

    }, [ReceivedOnBoardTutor])
    useEffect(() => {
        if (token) {
            dispatch(getSubjects(token));
        }
    }, [token])

    const searchParams = useSearchParams();
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});

    const [skills, setSkills] = useState("");
    const [subjects, setSubjects] = useState<string[]>([]);
    const [grade, setGrades] = useState<string[]>([]);
    const [boardEducation, setBoardEducation] = useState<string[]>([]);

    const [gradeIds, setGradeIds] = useState<string[]>([]);
    const [boardEducationIds, setBoardEducationIds] = useState<string[]>([]);
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const handleGradeChange = (selectedGrades: string[]) => {
        setGrades(selectedGrades);
    };

    const handleBoardEducationChange = (selectedBoardEducation: string[]) => {
        setBoardEducation(selectedBoardEducation);
    };

    const handleSubjectsChange = (selectedSubjects: string[]) => {
        if (selectedSubjects.includes('Other')) {

            Swal.fire({
                title: 'Enter the Other Subject Name',
                input: 'text',
                inputPlaceholder: 'Type your subject here...',
                showCancelButton: true,
                confirmButtonText: 'Add Subject',
                cancelButtonText: 'Cancel',
                preConfirm: (value) => {
                    if (!value) {
                        Swal.showValidationMessage('Please enter a subject name');
                    }
                    return value;
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const otherSubject = result.value;
                    setSubjects((prevSubjects) => [...prevSubjects, otherSubject]);
                }
            });
        } else {
            setSubjects(selectedSubjects);
        }
    };

    const setGradeSelectedIds = (selectedIds: string[]) => {
        setGradeIds(selectedIds);
    };

    const setBoardEducationSelectedIds = (selectedIds: string[]) => {
        setBoardEducationIds(selectedIds);
    };

    const setSubjectSelectedIds = (selectedIds: string[]) => {
        setSubjectIds(selectedIds);
    };

    const handleSubmit = () => {

        if (!skills) {
            toast.error("Skills are required!");
            return;
        }
        if (grade.length === 0) {
            toast.error("Please select at least one grade!");
            return;
        }
        if (boardEducation.length === 0) {
            toast.error("Please select at least one board of education!");
            return;
        }
        if (subjects.length === 0) {
            toast.error("Please select at least one subject!");
            return;
        }

        const data = {
            fullName: queryParams?.name,
            phoneNumber: queryParams?.mobileNumber,
            gender: queryParams?.gender,
            dateOfBirth: queryParams?.dob,
            email: queryParams?.email,
            educationalDetails: {
                grade: grade,
                skills: skills.split(',').map(skill => skill.trim()),
                boardEducation: boardEducation,
                courses: queryParams?.courses,
                highestEducation: queryParams['Highest Education']
            },
            specialSubjects: subjects
        };

        dispatch(getOnBoardTutor(token, data, token?.user?.id));

    };

    const optionsGrade = handelGrades?.map((group: any) => ({
        id: group?.id,
        label: group.label,
        value: group.value
    })) ?? [];

    const optionsBoardEducation = handelBoardEduction?.map((group: any) => ({
        id: group?.id,
        label: group.label,
        value: group.value
    })) ?? [];

    const optionsSubjects = [
        ...ReceivedSubjects?.map((group: any) => ({
            id: group?.id,
            label: group?.name,
            value: group?.name
        })) ?? [],
        { id: 'other', label: 'Other', value: 'Other' } // Add the "Other" option
    ];

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);
    }, [searchParams]);

    return (
        <>
            <TabNavigator>
                <div className='flex justify-center items-center mt-20 '>
                    <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border rounded-[19px] p-6'>
                        <span className='font-medium text-xl text-[#707070] block mb-4 opacity-100'>What areas or fields do you specialize in?</span>

                        {/* Grade Selection */}
                        <div className="mt-2 mb-5">
                            <label className="block text-[#707070] text-[14px] mb-2">Grade</label>
                            <div className="w-full">
                                <MultipleSelection
                                    options={optionsGrade}
                                    selectedOptions={grade}
                                    setSelectedOptions={handleGradeChange}
                                    setSelectedIds={setGradeSelectedIds} // Unique selected IDs for grades
                                    selectedStudentId={gradeIds}
                                    label={"Select Grade"}
                                />
                            </div>
                        </div>

                        {/* Subjects Selection */}
                        <div className="mt-2 mb-5">
                            <label className="block text-[#707070] text-[14px] mb-2">Subjects</label>
                            <div className="w-full">
                                <MultipleSelection
                                    options={optionsSubjects}
                                    selectedOptions={subjects}
                                    setSelectedOptions={handleSubjectsChange}
                                    setSelectedIds={setSubjectSelectedIds} // Unique selected IDs for subjects
                                    selectedStudentId={subjectIds}
                                    label={"Select Subjects"}
                                />
                            </div>
                        </div>

                        {/* Board Education Selection */}
                        <div className="mt-2 mb-5">
                            <label className="block text-[#707070] text-[14px] mb-2">Board Education</label>
                            <div className="w-full">
                                <MultipleSelection
                                    options={optionsBoardEducation}
                                    selectedOptions={boardEducation}
                                    setSelectedOptions={handleBoardEducationChange}
                                    setSelectedIds={setBoardEducationSelectedIds} // Unique selected IDs for board education
                                    selectedStudentId={boardEducationIds}
                                    label={"Select Board Education"}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Skills</label>
                            <InputMain
                                name="material"
                                value={skills || ''}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="Add any skills like Music, Painting, Arts Etc..."
                                label=""
                                type=""
                                id=""
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='mt-8'>
                            <button className='w-full bg-[#D8D8D8] h-10 rounded-md text-[#707070] border border-[#707070] font-medium' onClick={handleSubmit}>Submit</button>
                        </div>

                    </div>
                </div>
            </TabNavigator>
        </>
    );
};

export default StudentRequirementForm;


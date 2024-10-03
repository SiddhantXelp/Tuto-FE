"use client";
import React, { useState } from 'react';
import TabNavigator from "../../TabNavigator/page";
import MultipleSelection from '@/common/MultipleSelection';
import { handelGrades, handelBoardEduction, handelSubjects } from "../educationDetails/data";
import InputMain from '@/common/InputMain';
import { useRouter } from 'next/navigation';

const StudentRequirementForm: React.FC = () => {
    const router = useRouter();
    const [skills, setSkills] = useState("");

    const [grade, setGrades] = useState<string[]>([]);
    const [gradeIds, setGradeIds] = useState<string[]>([]);

    const [boardEducation, setBoardEducation] = useState<string[]>([]);
    const [boardEducationIds, setBoardEducationIds] = useState<string[]>([]);

    const [subjects, setSubjects] = useState<string[]>([]);
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const handleGradeChange = (selectedGrades: string[]) => {
        setGrades(selectedGrades);
    };

    const handleBoardEducationChange = (selectedBoardEducation: string[]) => {
        setBoardEducation(selectedBoardEducation);
    };

    const handleSubjectsChange = (selectedSubjects: string[]) => {
        setSubjects(selectedSubjects);
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
        // console.log("Selected Grades:", grade, "Selected Grade IDs:", gradeIds);
        // console.log("Selected Board Education:", boardEducation, "Selected Board Education IDs:", boardEducationIds);
        // console.log("Selected Subjects:", subjects, "Selected Subject IDs:", subjectIds);
        router.push(`/`);

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

    const optionsSubjects = handelSubjects?.map((group: any) => ({
        id: group?.id,
        label: group.label,
        value: group.value
    })) ?? [];

    return (
        <>
            <TabNavigator>
                <div className='flex justify-center items-center mt-20 '>
                    <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
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
                                    label={"Select Board Eduction"}
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

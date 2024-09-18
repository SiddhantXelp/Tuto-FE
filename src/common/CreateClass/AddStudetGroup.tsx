import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import CustomDropDown from '../CustomDropDown';
import Spinner from "@/common/Spinner";
import { FaChevronDown } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAddStudentGroup, setAddStudentGroup } from '@/app/store/actions/classes';
interface Student {
    id: string;
    fullName: string;
    grade: string;
    group: string;
    groupName: string
}

interface Group {
    id: string;
    title: string;
}


interface FinalSelectionItem {
    student: Student;
    groupId: string;
    groupName: string;
}


interface AddStudentPanelProps {
    isLoading: boolean;
    filteredStudents: Student[];
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionsGroup: Group[];
    handelAddStudent: (finalSelection: { student: Student; group: string }[]) => void;
}

const AddStudentPanel: React.FC<AddStudentPanelProps> = ({
    isLoading,
    filteredStudents,
    handleSearchChange,
    optionsGroup,
    handelAddStudent,
}) => {
    const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
    const [finalSelection, setFinalSelection] = useState<{ student: Student; group: string; groupName: string }[]>([]);

    const dispatch = useAppDispatch()

    // Handle selecting students
    const handleStudentClick = (student: Student) => {
        setSelectedStudentIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(student.id)) {
                newSet.delete(student.id); // Remove if already selected
            } else {
                newSet.add(student.id); // Add new selection
            }
            return newSet;
        });
    };

    const groupMap = new Map(optionsGroup.map(group => [group.id, group.title]));


    const handleGroupSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroupId = e.target.value;
        const selectedGroupName = groupMap.get(selectedGroupId) || ''; // Get the group name from the ID

        if (selectedGroupId && selectedStudentIds.size > 0) {
            const selectedStudents = filteredStudents.filter((student) =>
                selectedStudentIds.has(student.id)
            );

            // Map selected students with the chosen group ID and name
            const updatedSelection = selectedStudents.map((student) => ({
                student,
                group: selectedGroupId,
                groupName: selectedGroupName, // Use group name here
            }));

            // Accumulate the selected students with their group into the final selection
            setFinalSelection((prevSelection) => [...prevSelection, ...updatedSelection]);

            // Clear current selections
            setSelectedStudentIds(new Set());
        }
    };

    // Handle removing a student from the final selection
    const handleRemoveStudent = (index: number) => {
        setFinalSelection((prevSelection) =>
            prevSelection.filter((_, i) => i !== index) // Filter based on the index
        );
    };

    const transformData = (finalSelection: FinalSelectionItem[]) => {
        // Create a map to group student IDs by group IDs
        const groupMap: { [groupId: string]: string[] } = {};

        finalSelection.forEach(item => {
            const { group, student } = item;
            if (!groupMap[group]) {
                groupMap[group] = [];
            }
            groupMap[group].push(student.id);
        });

        // Convert the map into the required structure
        const groupStudents = Object.entries(groupMap).map(([groupId, studentIds]) => ({
            groupId,
            studentIds
        }));

        return { groupStudents };
    };


    const token = useAppSelector(state => state?.auth?.login);
    // const addGroupResponse = useAppSelector(state => state?.classes?.addStudentGroup);
    const addGroupResponse = useAppSelector((state: { classes: any }) => state.classes.addStudentGroup);
    const onAddClick = () => {
        const formattedOutput = transformData(finalSelection);

        dispatch(getAddStudentGroup(token, formattedOutput));
    };

    useEffect(() => {
        if (addGroupResponse?.data != null) {
            const formattedOutput = transformData(finalSelection);
            handelAddStudent(formattedOutput);
            dispatch(setAddStudentGroup(null));
        }

    }, [addGroupResponse])

    useEffect(() => {
        if (addGroupResponse?.alreadyAssigned === true) {
            alert(addGroupResponse?.message);
            dispatch(setAddStudentGroup(null));

        }

    }, [addGroupResponse])

    return (
        <div className="p-12">
            {isLoading && <Spinner />}
            <div className="flex justify-center items-center">
                <span className="font-medium text-xl text-[#707070] block mb-4">
                    + Add student
                </span>
            </div>
            <div>
                <label className="block text-sm mb-2 text-[#707070]">Search by name</label>
            </div>
            <div className="w-full flex items-center bg-white border border-[#707070] h-10 md:h-12 rounded-lg p-2">
                <input
                    type="text"
                    onChange={handleSearchChange}
                    placeholder="Enter name here"
                    className="w-full h-auto bg-transparent outline-none px-2"
                />
                <IoSearch className="text-gray-500" size={25} />
            </div>
            {filteredStudents.length > 0 ? (
                <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-lg shadow-md mt-2">
                    <table className="w-full bg-white rounded-lg shadow-sm">
                        <thead>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className={`w-full h-12 border-b border-gray-300 hover:bg-gray-200 ${selectedStudentIds.has(student.id) ? 'bg-gray-300' : ''
                                        }`}
                                    onClick={() => handleStudentClick(student)}
                                >
                                    <td className="px-4 py-2 text-gray-800 text-sm">
                                        {student.fullName}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 text-sm">{student.grade}</td>
                                    <td className="px-4 py-2 text-gray-800 text-sm">{student.group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-4 text-center text-gray-600 text-sm"></div>
            )}

            <div className="mt-2 mb-2">
                <div className='relative  mt-2 mb-2'>
                    <label className="block text-[#707070] text-[14px] mb-2">Select Group</label>
                    <div className="relative">
                        <select
                            name="addGroupStudent"
                            onChange={handleGroupSelection} // Your function to handle group selection
                            className="block w-full h-10 md:h-12 p-2 pr-8 text-buttonGray bg-white border border-[#707070] rounded-[8px] shadow-sm focus:ring-indigo-500 focus:border-gray-300 text-sm md:text-base opacity-100 appearance-none"
                        >
                            <option value="">Select Group</option>
                            {optionsGroup.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.title}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FaChevronDown size={16} color="gray" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <span className="text-buttonGray mt-6 block">Results</span>
            <div className="border border-buttonGray rounded-md overflow-hidden mt-2">
                <div className="max-h-64 overflow-y-auto">
                    {finalSelection.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-buttonGray text-sm">Student Name</th>
                                    <th className="px-4 py-2 text-left text-buttonGray text-sm">Assigned Group</th>
                                    <th className="px-4 py-2 text-left text-buttonGray text-sm">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalSelection.map((item, index) => (
                                    <tr key={index} className="w-full h-12 border-t border-buttonGray">
                                        <td className="px-4 py-2 text-buttonGray text-sm">{item.student.fullName}</td>
                                        <td className="px-4 py-2 text-buttonGray text-sm">{item?.groupName}</td>
                                        <td className="px-4 py-2 text-buttonGray text-sm">
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => handleRemoveStudent(index)} // Remove based on index
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    ) : (
                        <div className="p-4 text-center text-buttonGray text-sm">No students assigned yet</div>
                    )}
                </div>

            </div>
            <button
                onClick={onAddClick}  // Call onAddClick when button is clicked
                className="bg-[#707070] w-full h-12 mt-4 text-white rounded-lg"
            >
                Add
            </button>
        </div>
    );
};

export default AddStudentPanel;

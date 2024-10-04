"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import SelectMain from '@/common/SelectMain';
import Link from 'next/link';
import TabNavigator from "../TabNavigator/page";
import { useRouter } from 'next/navigation';
import SelectWithCheckboxes from '@/common/SelectWithCheckboxesFull';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getCreateUser, setAuthError, setCreateUser } from "@/app/store/actions/auth";
import Spinner from "../../common/Spinner"
import { toast } from 'react-toastify';
import { options, handelSubjects } from "./data";
import { getOnboardStudent, setOnboardStudent, setStudentError } from '../store/actions/student';
import { getTutorSubjects } from '../store/actions/user';
import Swal from 'sweetalert2';

const StudentRequirementForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedStudentId, setSelectedId] = useState([]);

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

  const receivedSubjects = useAppSelector(state => state?.user?.setTutorSubjects?.data?.subjects || []);

  const optionsSubjects = receivedSubjects?.map((group: any) => ({
    id: group?.id,
    label: group.name,
    value: group.name
  })) ?? [];

  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login);

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
      email: formData.email,
      phoneNumber: formData.mobileNumber,
      fullName: formData.name,
      gender: formData.gender,
      dateOfBirth: formData.dob,
      educationalDetails: {
        grade: [selectedOptions.grade],
        boardEducation: [selectedOptions.boardeducation]
      },
      roleId: "4672eb7e-4e43-412f-bcfc-5940efc42bef",
      parentId: memberAuthToken?.user?.id,
      specialSubjects: subjects
    }
    dispatch(getOnboardStudent(memberAuthToken?.token, data));

  }
  const onBoardStudentResponse = useAppSelector((state: { student: any }) => state?.student?.getOnboardStudent);

  useEffect(() => {
    if (onBoardStudentResponse && onBoardStudentResponse?.data?.id) {
      router.push(`/createPackage/${onBoardStudentResponse?.data?.id}`);

      Swal.fire({
        title: 'Success!',
        text: 'Student On-Board Successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });

      dispatch(setOnboardStudent(null));
    }
  }, [onBoardStudentResponse, router]);

  const isLoading = useAppSelector(state => state.student.loading);
  const isError = useAppSelector(state => state.student.error);


  useEffect(() => {

    if (isError) {
      toast.error(isError);
      dispatch(setStudentError(null));

    }
  }, [isError])

  const setSelectedIds = (options: any) => {
    setSelectedId(options);
  }

  useEffect(() => {
    dispatch(getTutorSubjects(memberAuthToken?.token, memberAuthToken?.user?.id))

  }, [dispatch])
  return (
    <>
      <TabNavigator>
        {
          isLoading ? <Spinner /> : ""
        }
        <div className='flex justify-center items-center mt-20 '>
          <div className='w-full max-w-xl bg-[#F8F5F5] shadow-xl border  rounded-[19px] p-6'>
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

                <div className="w-full  h-12">
                  <SelectWithCheckboxes
                    options={optionsSubjects}
                    selectedOptions={subjects}
                    setSelectedOptions={handleSelectChange}
                    setSelectedIds={setSelectedIds}
                    selectedStudentId={selectedStudentId}
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

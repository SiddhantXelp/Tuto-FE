
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import SelectWithCheckboxes from '@/common/SelectWithCheckboxes';
import InputMain from './InputMain';
import SelectMain from './SelectMain';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getStudentGroup, getCreateclass, setCreateClasses } from '@/app/store/actions/classes';
import CustomDropDown from './CustomDropDown';
import Spinner from "../common/Spinner"
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { buttons, Selectoptions, Tabbuttons, options, groups } from './commonData';
import { IoSearch } from 'react-icons/io5';
import { getStudents } from '@/app/store/actions/student';
interface DialogComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface FormData {
  typeMeeting: string[];
  classTitle?: string;
  subject?: string;
  students?: string;
  material?: string;
  description?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  videoLink?: string;
  selectedGroup?: string;
  scheduleStartDate?: string;
  scheduleStartTime?: string;
  scheduleEndTime?: string;
  selectedOptions?: string[];
  addGroupStudent?: string
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    typeMeeting: [],
    selectedOptions: [],
  });
  const [errors, setErrors] = useState<string[]>([]);
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup);
  const receivedCreatedClass = useAppSelector((state: { classes: any }) => state.classes.createclass);
  const isLoading = useAppSelector(state => state.student.loading);
  const isError = useAppSelector((state: { classes: any }) => state.classes.setClassesError);
  const [tabValue, setTabValue] = useState('Create new class');
  const [showNewContent, setShowNewContent] = useState(false);
  const viewStudentData = useAppSelector((state: { student: any }) => state.student?.getStudents?.students || []);

  useEffect(() => {
    if (open) {
      dispatch(getStudentGroup(memberAuthToken));
    }
  }, [dispatch, memberAuthToken, open]);

  useEffect(() => {
    if (showNewContent) {
      const page = "1";
      const limit = "100";
      dispatch(getStudents(memberAuthToken, page, limit));

    }
  }, [dispatch, memberAuthToken, showNewContent]);


  const handleTabClick = (name: string) => {
    setTabValue(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCheckboxChangeNew = (value: string) => {
    setFormData(prevFormData => {
      const newSelectedDay = prevFormData.typeMeeting.includes(value) ? null : value;
      return {
        ...prevFormData,
        typeMeeting: newSelectedDay ? [newSelectedDay] : [],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSelectChange = (options: string[]) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      selectedOptions: options,
    }));
  };

  const handelNext = (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      setTabValue("Virtual platform")
    } else {
      errors.forEach(error => toast.error(error));
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, startDate: e.target.value }));
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, startTime: e.target.value }));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, endTime: e.target.value }));
  };

  const validateForm = () => {
    const validationErrors: string[] = [];
    if (!formData.classTitle) validationErrors.push("Class title is required.");
    if (!formData.selectedGroup) validationErrors.push("Group selection is required.");
    if (!formData.material) validationErrors.push("Material URL required.");
    if (!formData.subject) validationErrors.push("Subject is required.");

    validationErrors.forEach(error => toast.error(error));
    return validationErrors.length === 0;
  };

  const validateFormFinal = () => {
    const validationErrors: string[] = [];
    if (!formData.typeMeeting || formData.typeMeeting.length === 0) {
      validationErrors.push("At least one virtual platform must be selected.");
    }

    if (!formData.startDate) {
      validationErrors.push("Schedule date is required.");
    }

    if (!formData.videoLink) {
      validationErrors.push("Video call link is required.");
    }

    if (!formData.selectedOptions || formData.selectedOptions.length === 0) {
      validationErrors.push("Select Days.");
    }

    if (!formData.description) {
      validationErrors.push("Subject description is required.");
    }

    if (!formData.startTime) {
      validationErrors.push("Schedule Start Time is required.");
    }

    if (!formData.endTime) {
      validationErrors.push("Schedule End Time is required.");
    }
    validationErrors.forEach(error => toast.error(error));

    return validationErrors.length === 0;
  };

  const handelCreate = (e: any) => {
    e.preventDefault();
    if (validateFormFinal() && validateForm()) {
      const data = {
        "title": formData.classTitle,
        "group": formData.selectedGroup,
        "materialUrl": formData.material,
        "platform": formData.typeMeeting[0],
        "scheduleDate": formData.startDate,
        "classStartTime": formData.startTime,
        "classEndTime": formData.endTime,
        "videoCallLink": formData.videoLink,
        "repeatClass": formData.selectedOptions,
        "subject": {
          "name": formData.subject,
          "description": formData.description
        },
        "studentGroupId": "a6682603-902e-4e45-855c-1412ab089295",
        "scheduleId": "66b69b7e-79bb-4890-b456-0a9ae9593f7d"
      }
      dispatch(getCreateclass(memberAuthToken, data))
    } else {
      errors.forEach(error => toast.error(error));
    }
  }

  const optionsGroup = classesData?.groups?.map((group: any) => ({
    id: group.id,
    title: group.title
  })) ?? [];

  const transformedSubjectOptions = groups?.map((group: any) => ({
    id: group.id,
    title: group.title
  })) ?? [];

  useEffect(() => {
    if (receivedCreatedClass) {
      Swal.fire({
        title: 'Success!',
        text: 'Class Created Successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });
      dispatch(setCreateClasses(null));
      setOpen(false)

    }
  }, [receivedCreatedClass]);

  useEffect(() => {
    if (isError) {
      toast.error(isError)
    }
  }, [isError]);

  const [searchInput, setSearchInput] = useState('');

  const handleInputChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredStudents = viewStudentData.filter((student: any) =>
    student.fullName.toLowerCase().includes(searchInput.toLowerCase())
  );


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      {
        isLoading ? <Spinner /> : ""
      }

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        {showNewContent ? (
          <DialogPanel className="bg-white w-full md:w-1/2 lg:w-1/3 h-auto rounded-2xl overflow-hidden">
            <div className='p-12'>
              <div className='flex justify-center items-center'>
                <span className='font-medium text-xl text-[#707070] block mb-4'> +Add student</span>

              </div>
              <div>
                <label className='block texttext-sm mb-2 text-[#707070]'>Search by name</label>
              </div>
              <div className="w-full flex items-center bg-white border border-[#707070] h-10 md:h-12 rounded-lg p-2">
                <input
                  type="text"
                  onChange={handleInputChangeSearch}
                  placeholder="Enter name here"
                  className="w-full h-auto bg-transparent outline-none px-2"
                />
                <IoSearch className="text-gray-500" size={25} />
              </div>
              <div className='mt-2 mb-2'>
                <CustomDropDown
                  label="Select Group"
                  name="addGroupStudent"
                  lablename=""
                  options={optionsGroup}
                  value={String(formData.addGroupStudent)}
                  onChange={(e) => handleChange({ target: { name: 'addGroupStudent', value: e.target.value } })}
                />
              </div>

              <span className='text-buttonGray '>Result</span>
              <div className="border border-buttonGray rounded-md overflow-hidden mt-2">
                <div className="max-h-64 overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    <table className="w-full">
                      <tbody>
                        {filteredStudents.map((student: any, index: number) => (
                          <tr
                            key={index}
                            className={`w-full h-12 border-b border-buttonGray hover:bg-[#E2E2E2]`}
                          >
                            <td className="px-4 py-2 text-buttonGray text-sm">{index + 1}. {student.fullName}</td>
                            <td className="px-4 py-2 text-buttonGray text-sm">{student.grade}</td>
                            <td className="px-4 py-2 text-buttonGray text-sm">{student.group}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 text-center text-buttonGray text-sm">
                      Student Not Found
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowNewContent(false)}
                className='bg-[#707070] w-full h-12 mt-4 text-white rounded-lg'
              >
                Add
              </button>
            </div>
          </DialogPanel>
        ) : (
          <DialogPanel className="bg-white w-full md:w-1/2 lg:w-1/3 h-auto rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row p-0 gap-0">
              {Tabbuttons.map((item) => (
                <button
                  key={item.id}
                  className={`h-14 flex-1 ${tabValue === item.name ? 'bg-white' : 'bg-[#ECEAEA]'
                    } `}
                  onClick={() => handleTabClick(item.name)}
                >
                  <span className={`text-left font-semibold text-[14px] md:text-[18px] leading-[1.5] text-[#707070] opacity-100 ${tabValue === item.name ? 'bg-white' : 'text-[#707070] opacity-50'
                    }`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            <div className='p-5'>
              {tabValue === 'Create new class' && (
                <form>
                  <div className="mb-4">
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Class title</label>
                    <InputMain
                      name="classTitle"
                      value={formData.classTitle || ''}
                      onChange={handleInputChange}
                      placeholder="Enter class title"
                      label=""
                      type=""
                      id=""
                    />
                  </div>
                  <div className="mb-4">
                    <CustomDropDown
                      label="Select Subject"
                      name=""
                      lablename="Select Subject"
                      options={transformedSubjectOptions}
                      value={String(formData.subject)}
                      onChange={(e) => handleChange({ target: { name: 'subject', value: e.target.value } })}
                    />
                  </div>
                  <div className='flex justify-end cursor-pointer' onClick={() => setShowNewContent(true)}><span className='text-[#6282FF] underline text-sm'>+ Add Student</span> </div>
                  <div className="mb-4">
                    {/* <div className="w-full md:w-1/2"> */}
                    <CustomDropDown
                      label="Select Group"
                      name="selectedGroup"
                      lablename=""
                      options={optionsGroup}
                      value={String(formData.selectedGroup)}
                      onChange={(e) => handleChange({ target: { name: 'selectedGroup', value: e.target.value } })}
                    />
                    {/* </div> */}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-0">Material Url</label>
                    <InputMain
                      name="material"
                      value={formData.material || ''}
                      onChange={handleFileChange}
                      placeholder="Enter material URL"
                      label=""
                      type=""
                      id=""
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-[#707070] text-white py-2 rounded-md text-sm md:text-base"
                    onClick={handelNext}
                  >
                    Next
                  </button>
                </form>
              )}
              {tabValue === 'Virtual platform' && (
                <>
                  <div>
                    <p className='block text-[#707070] text-[12px] md:text-[14px] mb-2'>Virtual platform</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {buttons.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`rounded-md transition-colors duration-300 ease-in-out border w-50 h-12 ${formData.typeMeeting.includes(item.name) ? 'bg-[#707070] text-white border-[#707070]' : 'bg-white text-[#707070] border-[#707070]'} hover:bg-[#505050] hover:text-white focus:outline-none border-[#707070]`}
                          onClick={() => handleCheckboxChangeNew(item.name)}
                        >
                          <p className='text-sm'>{item.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-0 mt-5">
                    <p className="block text-[#707070] text-[12px] md:text-[14px] mb-2">Schedule</p>
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
                        <input
                          type="date"
                          value={formData.startDate || "DD-MM-YYY"}
                          onChange={handleDateChange}
                          placeholder='DD-MM-YYY'
                          className="border border-buttonGray rounded-md w-full md:w-[150px] h-10 text-buttonGray text-sm pl-2"
                        />
                        <input
                          type="time"
                          value={formData.startTime || "00:00"}
                          onChange={handleStartTimeChange}
                          className="border border-[#707070] rounded-md w-full md:w-[110px] h-10 bg-white p-2 text-buttonGray text-sm"
                        />
                        <span className="text-[#707070] text-[12px] md:text-[14px] mt-2">to</span>
                        <input
                          type="time"
                          value={formData.endTime || "00:00"}
                          onChange={handleEndTimeChange}
                          className="border border-[#707070] rounded-md w-full md:w-[110px] h-10 bg-white p-2 text-buttonGray text-sm"
                        />
                      </div>
                      <div className="w-full md:w-1/3 mt-2 md:mt-0">
                        <SelectWithCheckboxes
                          options={options}
                          selectedOptions={formData.selectedOptions}
                          setSelectedOptions={handleSelectChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>



                  <div className="mt-5">
                    <label className="block text-[#707070] text-[12px] md:text-[14px]">Video call link</label>
                    <InputMain
                      name="videoLink"
                      value={formData.videoLink || ''}
                      onChange={handleInputChange}
                      placeholder="Enter Video call link"
                      label=""
                      type=""
                      id=""
                    />
                  </div>
                  <div className="mt-5">
                    <span className='block text-[#707070] text-[12px] md:text-[14px]'>Description</span>
                    <textarea
                      value={formData.description || ''}
                      name="description"
                      onChange={handleInputChange}
                      placeholder="Write your description here"
                      rows={6}
                      cols={40}
                      className='h-auto w-full bg-white border border-[#707070] rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm'
                    />
                  </div>
                  <div className='mt-8'>
                    <button type="submit" className='w-full bg-[#707070] h-10 rounded-md text-white text-sm md:text-base' onClick={handelCreate}>Create</button>
                  </div>
                </>
              )}
            </div>
          </DialogPanel>

        )}
      </div>
    </Dialog>
  );
};

export default DialogComponent;

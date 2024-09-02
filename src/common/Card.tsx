
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import SelectWithCheckboxes from '@/common/SelectWithCheckboxes';
import InputMain from './InputMain';
import SearchComponent from '@/common/SearchComponent';
import SelectMain from './SelectMain';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getStudentGroup, getCreateclass, setCreateClasses } from '@/app/store/actions/classes';
import CustomDropDown from './CustomDropDown';
import Spinner from "../common/Spinner"
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { buttons, Selectoptions, Tabbuttons, options, groups } from './commonData';
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
  const [devdata, setDevdata] = useState({
    searchQuery: '',
    filter: {}
  });

  useEffect(() => {
    if (open) {
      dispatch(getStudentGroup(memberAuthToken));
    }
  }, [dispatch, memberAuthToken, open]);

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

  const handleSelectChangedev = (name: string, value: any) => {
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
        "studentGroupId": "10bee614-b67e-4d66-8a23-7bb140ae8900",
        "scheduleId": "03159c49-cfcf-4592-9f8e-91c29c3b08c1"
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
      dispatch(setCreateClasses(null))

      setOpen(false)

    }
  }, [receivedCreatedClass]);

  useEffect(() => {
    if (isError) {
      toast.error(isError)
    }
  }, [isError]);


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      {
        isLoading ? <Spinner /> : ""
      }

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        {showNewContent ? (
          <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
            <div className='p-12'>
              <div className='flex justify-center items-center'>
                <span className='font-medium text-xl text-blue block mb-4'> +Add student</span>

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

              <span className='text-buttonGray '>Result</span>
              <div className='p-1  border border-buttonGray rounded-md'>

                <table className="w-full   rounded-md">

                  <tbody>
                    <tr className="bg-gray-100 w-full h-14 border-b-1 border-buttonGray ">
                      <td className="px-4 py-2 text-buttonGray text-xxs">1. Suresh</td>
                      <td className="px-4 py-2 text-buttonGray text-xxs">5th grade</td>
                      <td className="px-4 py-2 text-buttonGray text-xxs">Group C</td>
                    </tr>
                    <tr className="bg-gray-50 w-full h-14  border-buttonGray border-b-1 ">
                      <td className="px-4 py-2 text-buttonGray text-xxs">1. Suresh</td>
                      <td className="px-4 py-2 text-buttonGray text-xxs">5th grade</td>
                      <td className="px-4 py-2 text-buttonGray text-xxs">Group C</td>
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
                      name="selectedSubject"
                      lablename=""
                      options={transformedSubjectOptions}
                      value={String(formData.subject)}
                      onChange={(e) => handleChange({ target: { name: 'subject', value: e.target.value } })}
                    />
                  </div>
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
                          className={`rounded-md transition-colors duration-300 ease-in-out border-2 w-50 h-12 ${formData.typeMeeting.includes(item.name) ? 'bg-[#707070] text-white border-[#707070]' : 'bg-white text-[#707070] border-[#707070]'} hover:bg-[#505050] hover:text-white focus:outline-none border-[#707070]`}
                          onClick={() => handleCheckboxChangeNew(item.name)}
                        >
                          <p className='text-base'>{item.name}</p>
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
                          className="border border-buttonGray rounded-md w-full md:w-[150px] h-10"
                        />
                        <input
                          type="time"
                          value={formData.startTime || "00:00"}
                          onChange={handleStartTimeChange}
                          className="border border-[#707070] rounded-md w-full md:w-[110px] h-10 bg-white p-2"
                        />
                        <span className="text-[#707070] text-[12px] md:text-[14px] mt-2">to</span>
                        <input
                          type="time"
                          value={formData.endTime || "00:00"}
                          onChange={handleEndTimeChange}
                          className="border border-[#707070] rounded-md w-full md:w-[110px] h-10 bg-white p-2"
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

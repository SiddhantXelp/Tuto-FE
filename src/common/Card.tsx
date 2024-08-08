
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


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
      Optionlabel: "",
      options: [
        { label: "English", value: "English" },
        { label: "Social", value: "Social" },
        { label: "GroupA", value: "GroupA" },
        { label: "Group B", value: "Group B" },
      ],
    },

  ]


  const Tabbuttons: ButtonItem[] = [
    { id: 1, name: 'Create new class' },
    { id: 2, name: 'Virtual platform' },
  ];

  const dispatch = useAppDispatch();

  const memberAuthToken = "hiaJDFKljkajdkaklsdmabksjdlm,asdasd"
  useEffect(() => {
    if (open) {
      dispatch(getStudentGroup(memberAuthToken));

    }
  }, [dispatch, memberAuthToken, open]);


  const classesData = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  // Handle the change specifically for SelectMain options
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

    console.log(":::::::::::::::::::::::::::::::name", name, value);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCheckboxChangeNew = (value: string) => {
    setFormData(prevFormData => {
      // If the item is already selected, clear the selection (or you can decide to keep it selected)
      const newSelectedDay = prevFormData.typeMeeting.includes(value) ? null : value;

      return {
        ...prevFormData,
        typeMeeting: newSelectedDay ? [newSelectedDay] : [], // Keep only one selected item or clear selection
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

  const [errors, setErrors] = useState<string[]>([]);


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
        // "classStartTime": "2024-08-05T15:29:56.143Z",
        // "classEndTime": "2024-08-05T15:29:56.143Z",
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
  const SubjectOptions = [
    { label: "English", value: "English" },
    { label: "Social", value: "Social" },
  ];

  const groups = [
    {
      id: "56be1cdb-b891-4f74-8062-8dfc200b30f5",
      title: "Select Subject"
    },
    {
      id: "68b1b474-3120-4c44-af88-2a7fdd70723d",
      title: "English"
    },
    {
      id: "faecf314-5ea4-4536-adac-ef0343161e21",
      title: "Science"
    },
    {
      id: "d8b5e2f4-9d9d-4f42-9d5e-2c8b8a4f2b70",
      title: "Mathematics"
    },
    {
      id: "3bfa20f7-905b-4c39-9d21-1b2c8b7c4f90",
      title: "History"
    },
    {
      id: "7f8c2a5b-914d-4f4f-89a2-4e6f2b8e5a8c",
      title: "Geography"
    }
  ];

  const optionsGroup = classesData?.groups?.map((group: any) => ({
    id: group.id,
    title: group.title
  })) ?? [];

  const transformedSubjectOptions = groups?.map((group: any) => ({
    id: group.id,
    title: group.title
  })) ?? [];

  const isLoading = useAppSelector(state => state.student.loading);

  const receivedCreatedClass = useAppSelector((state: { classes: any }) => state.classes.createclass);


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


  const isError = useAppSelector((state: { classes: any }) => state.classes.setClassesError);

  useEffect(() => {
    if (isError) {
      toast.error(isError)
    }

  }, [isError])
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
                  <thead>
                    {/* <tr className="bg-gray-300 w-full h-14">
        <th className="px-4 py-2 text-left">Song</th>
        <th className="px-4 py-2 text-left">Artist</th>
        <th className="px-4 py-2 text-left">Year</th>
      </tr> */}
                  </thead>
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
          <DialogPanel className="bg-white rounded-lg shadow-xl w-full md:w-1/2 lg:w-1/3 h-auto">
            <div className="flex flex-col md:flex-row p-0 gap-0 rounded-lg">
              {Tabbuttons.map((item) => (
                <button
                  key={item.id}
                  className={`h-14 flex-1 border-t-2 border-l-2 border-r-2 border-white-500 ${tabValue === item.name ? 'bg-white' : 'bg-[#ECEAEA]'
                    } rounded-tl-lg rounded-tr-lg`}
                  onClick={() => handleTabClick(item.name)}
                >
                  <span className="text-left font-semibold text-[14px] md:text-[18px] leading-[1.5] text-[#707070] opacity-100">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            <div className='p-5'>
              {tabValue === 'Create new class' && (
                <form>
                  <div className="mb-4">
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-2">Class title</label>
                    <InputMain
                      name="classTitle"
                      value={formData.classTitle || ''}
                      onChange={handleInputChange}
                      placeholder="Enter class title"
                    />
                  </div>
                  <div className="mb-4">
                    <CustomDropDown
                      label="Select Subject"
                      name="selectedSubject"
                      lablename=""
                      options={transformedSubjectOptions}
                      value={formData.subject}
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
                      value={formData.selectedGroup}
                      onChange={(e) => handleChange({ target: { name: 'selectedGroup', value: e.target.value } })}
                    />
                    {/* </div> */}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#707070] text-[12px] md:text-[14px] mb-2">Material Url</label>
                    <InputMain
                      name="material"
                      value={formData.material || ''}
                      onChange={handleFileChange}
                      placeholder="Enter material URL"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-gray-500 text-white py-2 rounded-md text-sm md:text-base"
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
                          className={`transition-colors duration-300 ease-in-out border-2 w-50 h-12 rounded-md ${formData.typeMeeting.includes(item.name) ? 'bg-[#707070] text-white border-[#707070]' : 'bg-white text-[#707070] border-[#707070]'} hover:bg-[#505050] hover:text-white focus:outline-none border-[#707070]`}
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
                    <button type="submit" className='w-full bg-buttonGray h-10 rounded-md text-white text-sm md:text-base' onClick={handelCreate}>Create</button>
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

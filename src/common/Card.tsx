
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import SelectWithCheckboxes from '@/common/SelectWithCheckboxes';
import TextAreaInput from '@/common/TextAreaInput';
import { MdOutlineContentCopy } from 'react-icons/md';
import InputMain from './InputMain';
import FileInputWithIcon from '@/common/FileInputWithIcon';
import SearchComponent from '@/common/SearchComponent';
import SelectMain from './SelectMain';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getStudentGroup } from '@/app/store/actions/classes';
import CustomDropDown from './CustomDropDown';


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

  const SubjectOPtions = [
    {
      label: "Subject",
      name: "Subject",
      lablename: "Select Subjects",
      Optionlabel: "",
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
      lablename: "Select type of class",
      Optionlabel: "",
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

  const dispatch = useAppDispatch();

  const memberAuthToken = "hiaJDFKljkajdkaklsdmabksjdlm,asdasd"
  useEffect(() => {
    dispatch(getStudentGroup(memberAuthToken));
  }, [dispatch, memberAuthToken]);


  const classesData = useAppSelector((state: { classes: any }) => state.classes.getstudentgroup);

  console.log("::::::::::::::::{{{{{{{{{{{{{{{{{{{{{{", classesData?.groups);
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
  const handleChange = (e: any) => {
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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   if (file) {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       material: file.name,
  //     }));
  //   }
  // };
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
    console.log("Hello Button");
    setTabValue("Virtual platform")
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

  const handelCreate = (e: any) => {
    e.preventDefault();

    console.log("formData>>>>>>>>>>>>", formData)

  }

  const data = {
    totalItems: 3,
    totalPages: 1,
    currentPage: 1,
    groups: [
      {
        id: "56be1cdb-b891-4f74-8062-8dfc200b30f8",
        title: "Sample Group Title",
        createdAt: "2024-08-01T13:19:03.000Z",
        updatedAt: "2024-08-01T13:19:03.000Z"
      },
      {
        id: "68b1b474-3120-4c44-af88-2a7fdd70723f",
        title: "Group B",
        createdAt: "2024-08-02T11:28:09.000Z",
        updatedAt: "2024-08-02T11:28:09.000Z"
      },
      {
        id: "faecf314-5ea4-4536-adac-ef0343161e20",
        title: "Group A",
        createdAt: "2024-08-02T11:28:01.000Z",
        updatedAt: "2024-08-02T11:28:01.000Z"
      }
    ]
  };

  const optionsGroup = classesData?.groups.map((group: any) => ({
    id: group.id,
    title: group.title
  }));


  console.log("{++++++++++++++++formData.selectedGroup", formData.selectedGroup);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        {showNewContent ? (
          <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
            <div className='p-12'>
              <div className='flex justify-center items-cente'>
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
          <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
            <div className="flex flex-row p-0 gap-1">
              {Tabbuttons.map((item) => (
                <button
                  key={item.id}
                  className={`h-10 w-full rounded-lg ${tabValue === item.name ? 'bg-white' : 'bg-buttonGray'}`}
                  onClick={() => handleTabClick(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className='p-5'>
              {tabValue === 'Create new class' && (

                <form>
                  <div className="mb-4">
                    <label className="block text-buttonGray text-xs mb-2">Class title</label>
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
                      <CustomDropDown
                        label="Select Group"
                        name="selectedGroup"
                        lablename=""
                        options={optionsGroup}
                        value={formData.selectedGroup}
                        onChange={(e) => handleChange({ target: { name: 'selectedGroup', value: e.target.value } })}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <div className="w-full">
                      <label className="block text-buttonGray text-xs mb-2">Material</label>
                      <InputMain
                        name="material"
                        value={formData.material || ''}
                        onChange={handleFileChange}
                        placeholder="Enter class title"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-gray-500 text-white py-2 rounded"
                    onClick={handelNext}
                  >
                    Next
                  </button>
                </form>

              )}
              {tabValue === 'Virtual platform' && (

                <>
                  <div>
                    <p className='text-buttonGray text-xs'>Virtual platform</p>
                    <div className="grid grid-cols-5 gap-2">
                      {buttons.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`border-buttonGray border-solid border-2 w-30 h-10 rounded-md ${formData.typeMeeting.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                          onClick={() => handleCheckboxChange(item.name)}
                        >
                          <p className='text-xs text-buttonGray'>{item.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-0">
                    <p className="text-xs text-buttonGray mt-2">Schedule</p>
                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                      <div className="flex flex-col md:flex-row gap-4">
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={handleDateChange}
                          className="border border-buttonGray rounded-md w-full md:w-40 h-10"
                        />

                        <div className="border-buttonGray border-solid border-2 w-full md:w-32 h-10 rounded-md">
                          <input
                            type="time"
                            value={formData.startTime}
                            onChange={handleStartTimeChange}
                            className="w-full h-full border-none"
                          />
                        </div>
                      </div>

                      <span className="p-2 text-buttonGray text-xs md:static md:p-0 mt-2">to</span>
                      <div className="border-buttonGray border-solid border-2 w-full md:w-32 h-10 rounded-md">
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={handleEndTimeChange}
                          className="w-full h-full border-none"
                        />
                      </div>

                      <div className="mt-2 md:mt-0 w-full md:w-48">
                        <SelectWithCheckboxes
                          options={options}
                          selectedOptions={formData.selectedOptions}
                          setSelectedOptions={handleSelectChange}
                        />
                      </div>
                    </div>
                  </div>


                  {/* <div>
                    <p className='text-xs text-buttonGray'>Video call link</p>
                    <div className='w-full h-12 border-2 border-gray-400 bg-white rounded-md flex items-center p-2'>
                      <p className='text-sm text-buttonGray'>https://react-icons.github.io/react-icons/search/#q=cop</p>
                      <p className='ml-auto flex items-center'><MdOutlineContentCopy /></p>
                    </div>
                  </div> */}
                  <div className="mb-4">
                    <label className="block text-buttonGray text-xs mb-2">Video call link</label>
                    <InputMain
                      name="videoLink"
                      value={formData.videoLink || ''}
                      onChange={handleInputChange}
                      placeholder="Enter Video call link"
                    />
                  </div>
                  <div className='mt-4'>
                    <span className='text-sm text-buttonGray'>Description</span>
                    {/* <TextAreaInput
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your text here..."
                      rows={6}
                      cols={40}
                    /> */}
                    <textarea
                      value={formData.description || ''}
                      name="description"
                      onChange={handleInputChange}
                      placeholder={"Enter your text here..."}
                      rows={6}
                      cols={40}
                      className='w-full border-2 border-gray-400 bg-white rounded-md'
                    />
                  </div>
                  <div className='mt-8'>
                    <button type="submit" className='w-full bg-buttonGray h-10 rounded-md text-white' onClick={handelCreate}>Create</button>
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

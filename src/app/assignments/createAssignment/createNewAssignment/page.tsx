"use client";
import InputMain from '@/common/InputMain';
import InputWithIcon from '@/common/InputWithIcon';
import React, { useEffect, useState } from 'react';
import TabNavigator from "../../../TabNavigator/page";
import { MdOutlineCancel } from "react-icons/md";
import SelectWithCheckboxes from '@/common/SelectWithCheckboxesFull';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getCreateAssignment, setCreateAssignment } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import { handelStudents, formFields } from "./data";
import { getStudents } from '@/app/store/actions/student';

interface FormData {
  titleName: string;
  subjects: string;
  student: string[];
  material: File | null;
  dueDate: string;
  radioInput: string;
  radioOptions: string[];
  checkboxInput: string;
  checkboxOptions: string[];
}

const CreateNewAssignment = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    titleName: '',
    subjects: '',
    student: [],
    material: null,
    dueDate: '',
    radioInput: '',
    radioOptions: [],
    checkboxInput: '',
    checkboxOptions: []
  });
  const viewStudentData = useAppSelector((state: { student: any }) => state.student?.getStudents || []);
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);


  useEffect(() => {
    if (memberAuthToken) {
      const page = "1";
      const limit = "10"
      dispatch(getStudents(memberAuthToken, page, limit));
    }

  }, [dispatch, memberAuthToken]);


  const [storedQuestions, setStoredQuestions] = useState(null);
  const isLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);
  const userData = useAppSelector((state: { auth: any }) => state.auth.login);
  const createAssignmentResponse = useAppSelector((state: { assignment: any }) => state.assignment.setCreateAssignments);
  const [errors, setErrors] = useState<string[]>([]);
  const [radioInput, setRadioInput] = useState('');
  const [checkboxInput, setCheckboxInput] = useState<string>('');
  const [showInput, setInput] = useState(false);
  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);

  const [cards, setCards] = useState([
    {
      id: 1,
      formData: {
        question: '',
        option: 'Paragraph',
        paragraph: '',
        radioGroup: '',
        checkboxes: '',
        file: "",
        radioInput: "",
        radioOptions: [],
        checkboxInput: "",
        checkboxOptions: [],
      }
    }
  ]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        formData: {
          question: '',
          option: 'Paragraph',
          paragraph: '',
          radioGroup: radioInput,
          checkboxes: checkboxInput,
          file: null,
          radioInput: "",
          radioOptions: [],
          checkboxInput: "",
          checkboxOptions: []

        }
      }
    ]);

  };

  const handleCheckboxChange = (cardIndex: any, checkboxValue: any) => {
    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? {
          ...card,
          formData: {
            ...card.formData,
            checkboxes: card.formData.checkboxes
              .split(',')
              .filter(Boolean)
              .includes(checkboxValue)
              ? card.formData.checkboxes
                .split(',')
                .filter(c => c !== checkboxValue)
                .join(',')
              : [...card.formData.checkboxes.split(','), checkboxValue].join(',')
          }
        }
        : card
    );
    setCards(newCards);
  };

  const handleFileChange = (cardIndex: any, e: any) => {
    const file = e.target.files[0];
    const updatedCards = [...cards];

    if (file) {
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        formData: {
          ...updatedCards[cardIndex].formData,
          file: file
        }
      };
      setCards(updatedCards);
    }
  };
  const handleCardChange = (cardIndex: any, e: any) => {
    const { name, value } = e.target;

    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? { ...card, formData: { ...card.formData, [name]: value } }
        : card
    );
    setCards(newCards);
  };

  const handleRadioChange = (cardIndex: any, value: any) => {
    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? { ...card, formData: { ...card.formData, radioGroup: value } }
        : card
    );
    setCards(newCards);
  };

  const handleRadioOptionChange = (cardIndex: any, optionIndex: any, e: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.radioOptions[optionIndex] = e.target.value;
    setCards(updatedCards);
  };

  const handleRadioInputChange = (cardIndex: any, e: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.radioInput = e.target.value;
    setCards(updatedCards);
  };

  const validateForm = () => {
    const validationErrors: string[] = [];
    if (!formData.titleName) validationErrors.push("Assignment title is required.");
    if (!formData.subjects) validationErrors.push("Subject is required.");
    if (!formData.student) validationErrors.push("Student required.");
    if (!formData.material) validationErrors.push("Material is required.");
    if (!formData.dueDate) validationErrors.push("Date is required.");

    validationErrors.forEach(error => toast.error(error));

    return validationErrors.length === 0;
  };

  const handleSubmit = () => {

    if (validateForm()) {
      const formattedData = {
        assignmentTitle: formData.titleName,
        subject: formData.subjects,
        students: formData.student,
        material: formData.material.name,
        date: formData.dueDate,
        questions: cards.map(card => {
          switch (card.formData.option) {
            case 'Paragraph':
              return {
                question: card.formData.question || 'Question',
                questionType: 'text',
                answer: []
              };
            case 'Multiple choice questions':
              return {
                question: card.formData.question || 'Question',
                questionType: 'radio',
                answer: card.formData.radioOptions
              };
            case 'Checkboxes':
              return {
                question: card.formData.question || 'Question',
                questionType: 'checkbox',
                answer: card.formData.checkboxOptions
              };
            case 'Upload file':
              return {
                question: card.formData.question || 'Question',
                questionType: 'file',
                answer: card.formData.file.name ? card.formData.file.name : 'No file uploaded'
              };
            default:
              return {
                question: card.formData.question || 'Question',
                questionType: 'text',
                answer: []
              };
          }
        })
      };
      setInput(true)
      setStoredQuestions(formattedData.questions);

    } else {
      errors.forEach(error => toast.error(error));
    }

  };

  const removeCard = (index: any) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const addRadioOption = (cardIndex: any) => {
    const updatedCards = [...cards];
    const newOption = updatedCards[cardIndex].formData.radioInput;

    if (newOption) {
      updatedCards[cardIndex].formData.radioOptions = [
        ...(updatedCards[cardIndex].formData.radioOptions || []),
        newOption,
      ];
      updatedCards[cardIndex].formData.radioInput = '';
      setCards(updatedCards);
    }
  };

  const deleteRadioOption = (cardIndex: any, optionIndex: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.radioOptions.splice(optionIndex, 1);
    setCards(updatedCards);
  };

  const handleCheckboxOptionChange = (cardIndex: any, optionIndex: any, e: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.checkboxOptions[optionIndex] = e.target.value;
    setCards(updatedCards);
  };

  const handleCheckboxInputChange = (cardIndex: any, e: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.checkboxInput = e.target.value;
    setCards(updatedCards);
  };

  const addCheckboxOption = (cardIndex: any) => {
    const updatedCards = [...cards];
    const newOption = updatedCards[cardIndex].formData.checkboxInput;

    if (newOption) {
      updatedCards[cardIndex].formData.checkboxOptions = [
        ...(updatedCards[cardIndex].formData.checkboxOptions || []),
        newOption,
      ];
      updatedCards[cardIndex].formData.checkboxInput = '';
      setCards(updatedCards);
    }
  };

  const deleteCheckboxOption = (cardIndex: any, optionIndex: any) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].formData.checkboxOptions.splice(optionIndex, 1);
    setCards(updatedCards);
  };

  const handleSelectChange = (options: string[]) => {
    setFormData(prevState => ({
      ...prevState,
      student: options
    }));
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log("PPPPPPPPPPPPPPPPPfiles", files);
    if (files && files[0]) {
      setFormData(prevState => ({
        ...prevState,
        material: files[0]
      }));
    }
  };

  const handelPublish = () => {
    const formattedData = {
      assignmentTitle: formData.titleName,
      subject: formData.subjects,
      students: formData.student,
      material: formData.material,
      date: formData.dueDate,
      questions: cards.map(card => {
        switch (card.formData.option) {
          case 'Paragraph':
            return {
              question: card.formData.question || 'Question',
              questionType: 'text',
              answer: []
            };
          case 'Multiple choice questions':
            return {
              question: card.formData.question || 'Question',
              questionType: 'radio',
              answer: card.formData.radioOptions
            };
          case 'Checkboxes':
            return {
              question: card.formData.question || 'Question',
              questionType: 'checkbox',
              answer: card.formData.checkboxOptions
            };
          case 'Upload file':
            return {
              question: card.formData.question || 'Question',
              questionType: 'file',
              answer: card.formData.file.name ? card.formData.file.name : 'No file uploaded'
            };
          default:
            return {
              question: card.formData.question || 'Question',
              questionType: 'text',
              answer: []
            };
        }
      })
    };

    const data = new FormData();
    data.append("student_id", userData?.user?.id)
    data.append('assignmentTitle', formattedData.assignmentTitle);
    data.append('subject', formattedData.subject);
    data.append('students', formattedData.students);
    data.append('date', formattedData.date);

    if (formattedData.material) {
      data.append('material', formattedData.material);
    }

    data.append('questions', JSON.stringify(formattedData.questions));
    dispatch(getCreateAssignment(token, data));

  }


  useEffect(() => {
    if (createAssignmentResponse) {
      Swal.fire({
        title: 'Success!',
        text: 'Assignment Created Successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });
      dispatch(setCreateAssignment(null));
      router.push("/assignments")

    }

  }, [createAssignmentResponse])



  const optionsStudents = viewStudentData?.students?.map((group: any) => ({
    label: group.fullName,
    value: group.fullName
  })) ?? [];

  return (
    <TabNavigator>
      {isLoading && <Spinner />}
      <div className='w-full h-[1000px] bg-gray-50 p-0 md:p-6'>
        <div className='bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col md:w-1/3'>
            <h2 className='text-lg  mb-4 text-[#101415]'>Create New Assignment</h2>
            <div className='space-y-4'>
              {formFields.map((field, index) => {
                switch (field.type) {
                  case 'text':
                    return (
                      <div key={index}>
                        {showInput ? (
                          <>
                            <label className='text-sm mb-2 text-[#707070]'>{field?.label}</label>
                            <h1>
                              {formData[field.name as keyof typeof formData] as string}
                            </h1>
                          </>
                        ) : (
                          <InputMain
                            name={field.name}
                            label={field.label}
                            placeholder={String(field.placeholder)}
                            onChange={handleChange}
                            value={formData[field.name as keyof typeof formData] as string} type={''} id={''}
                          />
                        )}
                      </div>
                    );
                  case 'select':
                    return (
                      <div key={index}>
                        {showInput ? (
                          <>
                            <label className='text-sm mb-2 text-[#707070]'>{field?.label}</label>

                            <h1>{formData[field.name as keyof typeof formData] as string}</h1>

                          </>
                        ) : (
                          <>
                            <div className="mt-2 mb-5">
                              <label className="block text-buttonGray text-sm mb-2">Students</label>
                              <div className="w-full  h-12">
                                <SelectWithCheckboxes
                                  options={optionsStudents}
                                  selectedOptions={formData.student}
                                  setSelectedOptions={handleSelectChange}
                                />
                              </div>
                            </div>

                          </>
                        )}
                      </div>
                    );
                  case 'file':
                    return (
                      <div key={index}>
                        {showInput ? (
                          <>
                            <label className='text-sm mb-2 text-[#707070]'>{field?.label}</label>
                            {formData.material ? (
                              <h1>{formData.material.name}</h1>
                            ) : (
                              <h1>No file selected</h1>
                            )}

                          </>
                        ) : (
                          <>
                            <div className='mt-4'>
                              <label className='text-sm mb-2 text-[#707070]'>{field?.label}</label>
                              <input
                                type='file'
                                name={field.name}
                                className=' h-auto w-full bg-white border border-[#707070] rounded-md p-2 opacity-100'
                                onChange={handleMaterialChange}
                              />

                            </div>
                          </>

                        )}
                      </div>
                    );
                  case 'date':
                    return (
                      <div key={index}>
                        {showInput ? (
                          <>
                            <label className='text-sm mb-2 text-[#707070]'>{field?.label}</label>

                            <h1>{formData[field.name as keyof typeof formData] as string}</h1>

                          </>
                        ) : (
                          <>
                            <label htmlFor={field.name} className='block text-sm mb-2 text-[#707070]'>
                              {field.label}
                            </label>
                            <InputWithIcon
                              type={field.type}
                              name={field.name}
                              icon={null}
                              onChange={handleChange}
                              value={formData[field.name as keyof typeof formData] as string}
                              placeholder=''
                            />
                          </>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}

            </div>
          </div>

          <div className='flex-grow md:w-2/3 mt-16'>

            {

              showInput ?
                (
                  <>
                    <div>
                      {storedQuestions && storedQuestions.map((question: any, index: any) => (
                        <div key={index} className='mb-4 bg-white shadow-sm border border-[#707070] rounded-md p-2 opacity-100'>
                          <div className='mb-4'>
                            <span className='text-gray-600 text-xs'>Question {index + 1}</span>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                              <p className='text-gray-700 border border-[#707070] rounded-md p-2 opacity-100'>
                                {question.question}
                              </p>
                              <p className='border border-[#707070] rounded-md p-2 opacity-100 text-gray-700'>
                                {question.questionType}
                              </p>
                            </div>
                          </div>

                          {question.questionType === 'radio' && (
                            <div className='mt-4'>
                              {question.answer?.map((option: any, idx: any) => (
                                <div key={idx} className='flex items-center mb-2'>
                                  <input
                                    type='radio'
                                    disabled
                                    name={`radioGroup${index}`}
                                    value={option}
                                    className='mr-2'
                                  />
                                  <p className='border border-[#707070] rounded-md p-2 w-48 mr-2'>
                                    {option}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {question.questionType === 'checkbox' && (
                            <div className='mt-4'>
                              {question.answer?.map((option: any, idx: any) => (
                                <div key={idx} className='flex items-center mb-2'>
                                  <input
                                    type='checkbox'
                                    disabled
                                    value={option}
                                    className='mr-2'
                                  />
                                  <p className='border border-[#707070] rounded-md p-2 w-48 mr-2'>
                                    {option}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {question.questionType === 'file' && (
                            <div className='mt-4'>
                              <p className='text-gray-700 text-xs mb-2'>Uploaded File</p>
                              <p className='h-auto w-full bg-white border border-[#707070] rounded-md p-2 opacity-100'>
                                {question.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )
                :
                (
                  <>
                    {cards.map((card, cardIndex) => (
                      <div key={card.id} className='mb-4 bg-white shadow-sm border border-[#707070] rounded-md p-2 opacity-100 mt-1'>
                        <button
                          onClick={() => removeCard(cardIndex)}
                          className='text-red-500 text-xs font-bold'
                        >
                          Remove Question
                        </button>
                        <div className='mb-4'>
                          <span className='text-gray-600 text-xs'>Question {cardIndex + 1}</span>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                            <input
                              className=' text-gray-700 border border-[#707070] rounded-md p-2 opacity-100'
                              type='text'
                              name='question'
                              value={card.formData.question}
                              onChange={(e) => handleCardChange(cardIndex, e)}
                            />
                            <select
                              name='option'
                              className='border border-[#707070] rounded-md p-2 opacity-100 text-gray-700'
                              value={card.formData.option}
                              onChange={(e) => handleCardChange(cardIndex, e)}
                            >
                              <option className='text-gray-600'>Paragraph</option>
                              <option className='text-gray-600'>Multiple choice questions</option>
                              <option className='text-gray-600'>Checkboxes</option>
                              <option className='text-gray-600'>Upload file</option>
                            </select>
                          </div>
                        </div>

                        {card.formData.option === 'Paragraph' && (
                          <>
                          </>
                        )}



                        {card.formData.option === 'Multiple choice questions' && (
                          <div className='mt-4'>
                            {card.formData.radioOptions?.map((value: any, index: any) => (
                              <div key={index} className='flex items-center mb-2'>
                                <input
                                  type='checkbox'
                                  name={`radioGroup${card.id}`}
                                  value={value}
                                  checked={card.formData.radioGroup === value}
                                  onChange={() => handleRadioChange(cardIndex, value)}
                                  className='mr-2'
                                />
                                <input
                                  type='text'
                                  value={value}
                                  onChange={(e) => handleRadioOptionChange(cardIndex, index, e)}
                                  className='border border-[#707070] rounded-md p-2 w-48 mr-2'
                                />

                                <MdOutlineCancel size={20} onClick={() => deleteRadioOption(cardIndex, index)} />

                              </div>
                            ))}

                            <div className='mt-4'>
                              <input
                                type='checkbox'
                                className='mr-2'
                              />
                              <input
                                type='text'
                                value={card.formData.radioInput || ''}
                                onChange={(e) => handleRadioInputChange(cardIndex, e)}
                                placeholder='Enter Option'
                                className='border border-[#707070] rounded-md p-2 w-48 mb-2'
                              />
                              <br />
                              <button
                                onClick={() => addRadioOption(cardIndex)}
                                className='ml-5 w-20 p-1 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )}

                        {card.formData.option === 'Checkboxes' && (
                          <div className='mt-4'>
                            {card.formData.checkboxOptions?.map((value: any, index: any) => (
                              <div key={index} className='flex items-center mb-2'>
                                <input
                                  type='checkbox'
                                  value={value}
                                  checked={card.formData.checkboxes.split(',').includes(value)}
                                  onChange={() => handleCheckboxChange(cardIndex, value)}
                                  className='mr-2'
                                />
                                <input
                                  type='text'
                                  value={value}
                                  onChange={(e) => handleCheckboxOptionChange(cardIndex, index, e)}
                                  className='border border-[#707070] rounded-md p-2 w-48 mr-2'
                                />

                                <MdOutlineCancel size={20} onClick={() => deleteCheckboxOption(cardIndex, index)} />

                              </div>
                            ))}
                            <div className='mt-4'>
                              <input
                                type='checkbox'
                                className='mr-2'
                              />
                              <input
                                type='text'
                                value={card.formData.checkboxInput || ''}
                                onChange={(e) => handleCheckboxInputChange(cardIndex, e)}
                                placeholder='Enter Option'
                                className='border border-[#707070] rounded-md p-2 w-48 mb-2'
                              />
                              <br />

                              <button
                                onClick={() => addCheckboxOption(cardIndex)}
                                className='ml-5 w-20 p-1 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )}
                        {card.formData.option === 'Upload file' && (
                          <div className='mt-4'>
                            <label htmlFor='uploadFile' className='text-gray-700 text-xs'>Upload File</label>
                            <input
                              type='file'
                              name='file'
                              className=' h-auto w-full bg-white border border-[#707070] rounded-md p-2 opacity-100'
                              onChange={(e) => handleFileChange(cardIndex, e)}
                            />
                            {card.formData.file && (
                              <div className='mt-2 text-gray-600'>
                                <strong>Uploaded File:</strong> {card.formData.file.name}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )

            }





            <div className='flex flex-col gap-4 mt-6'>
              {
                showInput ?
                  (
                    <button onClick={() => setInput(false)} className='p-2 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'>
                      <span className='text-sm'>Edit</span>

                    </button>
                  ) :
                  (
                    <button onClick={addCard} className='p-2 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'>
                      <span className='text-sm'>Add Question+</span>

                    </button>
                  )
              }

              {
                showInput ?
                  (
                    <>
                      <button className='p-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-500 hover:text-black hover:border-gray-500 transition-colors border border-grey' onClick={handelPublish}>
                        <span className='text-sm'>Save & Publish</span>
                      </button>
                    </>

                  )
                  :
                  (
                    <>
                      <button className='p-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-500 hover:text-black hover:border-gray-500 transition-colors border border-grey' onClick={handleSubmit}>
                        <span className='text-sm'>Create & Preview</span>
                      </button>
                    </>

                  )
              }

            </div>
          </div>
        </div>
      </div>
    </TabNavigator >
  );
};

export default CreateNewAssignment;

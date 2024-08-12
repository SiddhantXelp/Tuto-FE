"use client";
import FileInputWithIcon from '@/common/FileInputWithIcon';
import InputMain from '@/common/InputMain';
import InputWithIcon from '@/common/InputWithIcon';
import SelectMain from '@/common/SelectMain';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFile } from "react-icons/fa";
import TabNavigator from "../../../TabNavigator/page";

const CreateNewAssignment = () => {
  const [formData, setFormData] = useState({
    titleName: '',
    subjects: '',
    student: '',
    material: null,
    dueDate: '',
    radioInput: "",
    radioOptions: [],
    checkboxInput: "",
    checkboxOptions: []

  })

  const [cards, setCards] = useState([
    {
      id: 1,
      formData: {
        question: '',
        option: 'Paragraph',
        paragraph: '',
        radioGroup: '',
        checkboxes: '',
        file: null,
        radioInput: "",
        radioOptions: [],
        checkboxInput: "",
        checkboxOptions: [],
      }
    }
  ]);

  const [dynamicRadioOptions, setDynamicRadioOptions] = useState<string[]>([]);
  const [radioInput, setRadioInput] = useState('');
  const [dynamicCheckboxOptions, setDynamicCheckboxOptions] = useState<string[]>([]);
  const [checkboxInput, setCheckboxInput] = useState<string>('');

  const formFields = [
    {
      type: 'text',
      name: 'titleName',
      label: 'Assignment Title',
      placeholder: 'Write your assignment title'
    },
    {
      type: 'text',
      name: 'subjects',
      label: 'Subject',
      placeholder: 'Enter subject'
    },
    {
      type: 'select',
      name: 'student',
      label: 'Students',
      options: [
        { label: 'Select all', value: 'Selectall' },
        { label: 'Mahesh', value: 'Mahesh' },
        { label: 'Suresh', value: 'Suresh' }
      ],
      lablename: 'Select an option'
    },
    {
      type: 'file',
      name: 'material',
      label: 'Material',
      placeholder: 'Upload file'
    },
    {
      type: 'date',
      name: 'dueDate',
      label: 'Date',
      placeholder: 'Select date'
    }
  ];

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


  const handleSubmit = () => {
    const formattedData = {
      titleName: formData.titleName,
      subjects: formData.subjects,
      student: formData.student,
      material: formData.material,
      dueDate: formData.dueDate,
      questions: cards.map(card => {
        switch (card.formData.option) {
          case 'Paragraph':
            return {
              question_text: card.formData.question || 'Question',
              question_type: 'text',
              options: []
            };
          case 'Multiple choice questions':
            return {
              question_text: card.formData.question || 'Question',
              question_type: 'radio',
              options: card.formData.radioOptions
            };
          case 'Checkboxes':
            return {
              question_text: card.formData.question || 'Question',
              question_type: 'checkbox',
              options: card.formData.checkboxOptions
            };
          case 'Upload file':
            return {
              question_text: card.formData.question || 'Question',
              question_type: 'file',
              options: card.formData.material ? card.formData.material.name : 'No file uploaded'
            };
          default:
            return {
              question_text: card.formData.question || 'Question',
              question_type: 'text',
              options: []
            };
        }
      })
    };

    console.log(JSON.stringify(formattedData, null, 2));
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


  return (
    <TabNavigator>
      <div className='w-full h-[1000px] bg-gray-50 p-6 md:p-10'>
        <div className='bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col md:w-1/3'>
            <h2 className='text-lg  mb-4 text-[#101415]'>Create New Assignment</h2>
            <div className='space-y-4'>
              {formFields.map((field) => {
                switch (field.type) {
                  case 'text':
                    return (
                      <InputMain
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={String(field.placeholder)}
                        onChange={handleChange}
                        value={formData[field.name as keyof typeof formData] as string}
                      />
                    );
                  case 'select':
                    return (
                      <SelectMain
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        lablename={String(field.lablename)}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        className='w-full'
                      />
                    );
                  case 'file':
                    return (
                      <div key={field.name}>
                        <label htmlFor={field.name} className='block text-sm mb-2 text-[#707070]'>{field.label}</label>
                        <FileInputWithIcon
                          key={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          icon={<FaFile />}
                          onChange={handleFileChange}
                          className='w-full'
                        />
                      </div>
                    );
                  case 'date':
                    return (
                      <div key={field.name}>
                        <label htmlFor={field.name} className='block text-sm mb-2 text-[#707070]'>{field.label}</label>
                        <InputWithIcon
                          type={field.type}
                          name={field.name}
                          icon={null}
                          onChange={handleChange}
                          value={formData[field.name as keyof typeof formData] as string}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>

          <div className='flex-grow md:w-2/3 mt-16'>
            {cards.map((card, cardIndex) => (
              <div key={card.id} className='mb-4 bg-white shadow-sm border border-[#707070] rounded-md p-2 opacity-100'>
                <button
                  onClick={() => removeCard(cardIndex)}
                  className='text-red-500 text-xs font-bold'
                >
                  Remove Question
                </button>
                <div className='mb-4'>
                  <span className='text-gray-600 text-xs'>Question {cardIndex + 1}</span>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
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
                        <button
                          onClick={() => deleteRadioOption(cardIndex, index)}
                          className='mr-2 py-1 px-2 bg-red-500 text-white rounded-md'
                        >
                          Delete
                        </button>
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
                      <button
                        onClick={() => addRadioOption(cardIndex)}
                        className='ml-5 p-2 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'
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
                        <button
                          onClick={() => deleteCheckboxOption(cardIndex, index)}
                          className='mr-2 py-1 px-2 bg-red-500 text-white rounded-md'
                        >
                          Delete
                        </button>
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
                      <button
                        onClick={() => addCheckboxOption(cardIndex)}
                        className='ml-5 p-2 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'
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
                      className='border-2 border-gray-300 rounded-lg p-2 w-full'
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

            <div className='flex flex-col gap-4 mt-6'>
              <button onClick={addCard} className='p-3 bg-white-500 text-black rounded-lg shadow hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors border border-[#707070]'>
                <span className='text-sm'>Add Question+</span>

              </button>
              <button className='p-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-500 hover:text-black hover:border-gray-500 transition-colors border border-grey' onClick={handleSubmit}>
                {/* <Link href="/assignments/createAssignment/createNewAssignment/preview"> */}
                <span className='text-sm'>Create & Preview</span>
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </TabNavigator >
  );
};

export default CreateNewAssignment;

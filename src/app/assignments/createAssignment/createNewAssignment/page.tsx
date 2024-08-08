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
    dueDate: ''
  });

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





  const [cards, setCards] = useState([
    {
      id: 1,
      formData: {
        question: '',
        option: 'Paragraph',
        paragraph: '',
        radioGroup: '',
        checkboxes: '',
        file: null
      }
    }
  ]);

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        formData: {
          question: '',
          option: 'Paragraph',
          paragraph: '',
          radioGroup: '',
          checkboxes: '',
          file: null
        }
      }
    ]);
  };

  const handleCheckboxChange = (cardIndex, checkboxValue) => {
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

  const handleFileChange = (cardIndex, e) => {
    const { files } = e.target;
    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? { ...card, formData: { ...card.formData, file: files ? files[0] : null } }
        : card
    );
    setCards(newCards);
  };

  const handleCardChange = (cardIndex, e) => {
    const { name, value } = e.target;
    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? { ...card, formData: { ...card.formData, [name]: value } }
        : card
    );
    setCards(newCards);
  };

  const handleRadioChange = (cardIndex, value) => {
    const newCards = cards.map((card, index) =>
      index === cardIndex
        ? { ...card, formData: { ...card.formData, radioGroup: value } }
        : card
    );
    setCards(newCards);
  };

  const radioOptions = [
    { name: 'option1', value: 'Option1', label: 'Option 1' },
    { name: 'option2', value: 'Option2', label: 'Option 2' },
    { name: 'option3', value: 'Option3', label: 'Option 3' }
  ];

  const checkboxOptions = [
    { label: 'Option 1', value: 'Option1' },
    { label: 'Option 2', value: 'Option2' },
    { label: 'Option 3', value: 'Option3' }
  ];




  console.log(cards, "cards")
  console.log(formData, "formData")

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
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        value={formData[field.name as keyof typeof formData] as string}
                        className='w-full'
                      />
                    );
                  case 'select':
                    return (
                      <SelectMain
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        lablename={field.lablename}
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
                          className='w-full'
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
                  <textarea
                    name='paragraph'
                    placeholder='Answer text'
                    className=' text-gray-700 w-full h-24 border border-[#707070] rounded-md p-2 opacity-100'
                    value={card.formData.paragraph}
                    onChange={(e) => handleCardChange(cardIndex, e)}
                  />
                )}

                {card.formData.option === 'Multiple choice questions' && (
                  <div className='mt-4'>
                    {radioOptions.map((item) => (
                      <div key={item.name} className='flex items-center mb-2'>
                        <input
                          type='radio'
                          name={`radioGroup${card.id}`}
                          value={item.value}
                          checked={card.formData.radioGroup === item.value}
                          onChange={() => handleRadioChange(cardIndex, item.value)}
                          className='mr-2'
                        />
                        <label className='text-gray-600 text-xs'>{item.label}</label>
                      </div>
                    ))}
                  </div>
                )}

                {card.formData.option === 'Checkboxes' && (
                  <div className='mt-4'>
                    {checkboxOptions.map((checkbox) => (
                      <div key={checkbox.value} className='flex items-center mb-2'>
                        <input
                          type='checkbox'
                          checked={card.formData.checkboxes.split(',').includes(checkbox.value)}
                          onChange={() => handleCheckboxChange(cardIndex, checkbox.value)}
                          className='mr-2'
                        />
                        <label className='text-gray-600 text-xs'>{checkbox.label}</label>
                      </div>
                    ))}
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
              <button className='p-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-500 hover:text-black hover:border-gray-500 transition-colors border border-grey'>
                <Link href="/assignments/createAssignment/createNewAssignment/preview">
                  <span className='text-sm'>Create & Preview</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TabNavigator >
  );
};

export default CreateNewAssignment;

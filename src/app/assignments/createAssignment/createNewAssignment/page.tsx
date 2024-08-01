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
      <span>Create new assignment</span>

      <div className='grid grid-cols-10 h-full '>

        <div className='col-span-3 bg-white flex flex-row '>

          <div className='grid grid-cols-1'>
            <div className='p-4'>
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
                      />
                    );
                  case 'select':
                    return (
                      <SelectMain
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        lablename={field.lablename} // Ensure lablename is passed
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                      />
                    );
                  case 'file':
                    return (
                      <div key={field.name}>
                        <label htmlFor={field.name} className='text-buttonGray '>{field.label}</label>
                        <FileInputWithIcon
                          key={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          icon={<FaFile />}
                          onChange={handleFileChange}
                        />
                      </div>
                    );
                  case 'date':
                    return (
                      <div key={field.name}>
                        <label htmlFor={field.name} className='text-buttonGray'>{field.label}</label>
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
          <div className='w-0.5 h-72 bg-gray-300 ml-10'></div> {/* Divider */}
        </div>

        <div className='col-span-7 bg-white ml-1'>



          <div className='col-span-7 bg-white ml-1'>
            {cards.map((card, cardIndex) => (
              <div key={card.id} className='border-2 border-gray-300 gap-2 p-4 rounded-lg mb-4'>
                <div>
                  <span className='text-buttonGray text-xs'>Question {cardIndex + 1}</span>
                  <div className='grid grid-cols-2 gap-4'>
                    <input
                      className='border-2 h-10 border-gray-400 w-auto rounded-lg'
                      type='text'
                      name='question'
                      value={card.formData.question}
                      onChange={(e) => handleCardChange(cardIndex, e)}
                    />
                    <select
                      name='option'
                      className='border-2 h-10 border-gray-400 w-auto rounded-lg'
                      value={card.formData.option}
                      onChange={(e) => handleCardChange(cardIndex, e)}
                    >
                      <option className='text-buttonGray text-xs'>Paragraph</option>
                      <option className='text-buttonGray text-xs'>Multiple choice questions</option>
                      <option className='text-buttonGray text-xs'>Checkboxes</option>
                      <option className='text-buttonGray text-xs'>Upload file</option>
                    </select>
                  </div>
                  {card.formData.option === 'Paragraph' ? (
                    <div className='p-4'>
                      <textarea
                        name='paragraph'
                        placeholder='Answer text'
                        className='text-buttonGray text-xs border-b-2 border-gray-400 w-full h-24'
                        value={card.formData.paragraph}
                        onChange={(e) => handleCardChange(cardIndex, e)}
                      />

                    </div>
                  ) : card.formData.option === 'Multiple choice questions' ? (
                    <>
                      {radioOptions.map((item) => (
                        <div key={item.name}>
                          <input
                            type='radio'
                            name={`radioGroup${card.id}`}
                            value={item.value}
                            checked={card.formData.radioGroup === item.value}
                            onChange={() => handleRadioChange(cardIndex, item.value)}
                            className='mt-4 bg-slate-100  border-b-2 border-gray-400'
                          />
                          <label className='text-buttonGray text-xs ml-2'>{item.label}</label>
                        </div>
                      ))}

                    </>
                  ) : card.formData.option === 'Checkboxes' ? (
                    <>
                      {checkboxOptions.map((checkbox, checkboxIndex) => (
                        <div key={checkbox.value}>
                          <input
                            type='checkbox'
                            checked={card.formData.checkboxes.split(',').includes(checkbox.value)}
                            onChange={() => handleCheckboxChange(cardIndex, checkbox.value)}
                            className='mt-4 text-buttonGray size-2'
                          />
                          <label className='text-buttonGray text-xs ml-2'>{checkbox.label}</label>
                        </div>
                      ))}

                    </>
                  ) : card.formData.option === 'Upload file' ? (
                    <div className='p-4'>
                      <label htmlFor='uploadFile' className='text-buttonGray text-xs'>Upload File</label>
                      <input
                        type='file'
                        name='file'
                        className='border-2 h-10 border-gray-400 w-full rounded-lg'
                        onChange={(e) => handleFileChange(cardIndex, e)}
                      />
                      {card.formData.file && (
                        <div className='mt-2'>
                          <p><strong>Uploaded File:</strong> {card.formData.file.name}</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-4 p-2'>
            <button onClick={addCard} className='mb-4 p-2 bg-white border-2 border-buttonGray  sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full text-buttonGray rounded text-xs'>Add question+</button>
            <Link href="/assignments/createAssignment/createNewAssignment/preview">
              <button className='mb-4 p-2 bg-buttonGray sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full text-white rounded text-xs'>Create & Preview</button>
            </Link>
          </div>
        </div>


      </div>
    </TabNavigator>
  );
};

export default CreateNewAssignment;

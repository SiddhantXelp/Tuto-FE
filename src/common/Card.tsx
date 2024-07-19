'use client'

import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface DialogComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface ButtonItem {
  id: number;
  name: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
  const buttons: ButtonItem[] = [
    { id: 1, name: "Zoom" },
    { id: 2, name: "Google meet" },
    
  ];

  const Tabbuttons: ButtonItem[] = [
    { id: 1, name: "Create new class" },
    { id: 2, name: "Virtual platform" },
    
  ];
  const [formData, setFormData] = useState({
    typeMeeting: [] as string[],
  });
  const[tabValue,setTabValue]=useState('Create new class')

  const mainTabClick=(name:string)=>{
    setTabValue(name)
  }
  const handleButtonClick = (name: string) => {
    setFormData((prevFormData) => {
      const newSelectedDays = prevFormData.typeMeeting.includes(name)
        ? prevFormData.typeMeeting.filter((day) => day !== name)
        : [...prevFormData.typeMeeting, name];
      return {
        ...prevFormData,
        selectedDays: newSelectedDays,
      };
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-2/4 h-auto">
          <div className="flex flex-row p-1 gap-1">
            {Tabbuttons.map((item)=>(
            <button className='h-20 w-full bg-red-500 ${}' onClick={()=>mainTabClick(item.name)}> {item.name}</button>
            ))}
          </div>
          <div className='p-5'>
            <div>
              <p className='text-buttonGray'>Virtual platform</p>
              <div className="grid grid-cols-5 gap-2">
            {buttons.map((item) => (
              <button
                key={item.id}
                className={`border-buttonGray border-solid border-2 w-26 h-10 rounded-md ${
                  formData.typeMeeting.includes(item.name) ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
                onClick={() => handleButtonClick(item.name)}
              >
                <p className='text-sm text-buttonGray'>{item.name}</p>  
              </button>
            ))}
          </div>
            </div>

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogComponent;

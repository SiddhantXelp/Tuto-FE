'use client'

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface DialogComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
          <div className="px-4 py-5 ">
            <div className="text-center sm:text-left">
              <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                Create new class
              </DialogTitle>
              <div className="mt-2">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="class-title" className="block text-sm font-medium text-gray-700">
                      Class title
                    </label>
                    <input
                      type="text"
                      id="class-title"
                      name="class-title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Select type of class</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="students" className="block text-sm font-medium text-gray-700">
                      Students
                    </label>
                    <select
                      id="students"
                      name="students"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Choose students</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                      Material
                    </label>
                    <input
                      type="text"
                      id="material"
                      name="material"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogComponent;

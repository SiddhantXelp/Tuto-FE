'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

interface DialogComponentProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 z-20">
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Are you sure you want to start class?</h2>
                    </div>
                        <button
                            type="button"
                            className="w-full bg-gray-500 text-white py-2 rounded"
                            onClick={() => setOpen(false)}
                        >
                            Yes
                        </button>

                        <br />
                        <button
                            type="button"
                            className="w-full bg-gray-500 text-white py-2 rounded mt-5"
                            onClick={() => setOpen(false)}
                        >
                            No
                        </button>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default DialogComponent;

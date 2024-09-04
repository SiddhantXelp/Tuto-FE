'use client';

import { Dispatch, SetStateAction, ReactNode } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

interface DialogComponentProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, setOpen, children }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 z-20">
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default DialogComponent;

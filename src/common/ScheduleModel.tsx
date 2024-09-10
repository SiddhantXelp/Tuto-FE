import React, { memo } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import Table from '@/app/classManagement/overView/Table';
import { useRouter } from 'next/navigation';

interface AddFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ScheduleModel: React.FC<AddFolderModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
            <DialogPanel className="relative rounded-lg p-6 w-auto max-w-4xl">
                <div className='absolute top-4 right-6 bg-white p-2 rounded-full w-40 text-center cursor-pointer' onClick={() => router.push("/classManagement?tab=Time%20table")}>
                    <h1 className='text-primaryColor'>Full view</h1>
                </div>

                <div className="pt-10">
                    <div className="w-full bg-white p-6 rounded-lg shadow-xl">
                        <Table view={"Weekly"} />
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
};

export default memo(ScheduleModel);

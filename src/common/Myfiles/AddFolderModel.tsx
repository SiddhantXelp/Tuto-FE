import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import InputMain from '@/common/InputMain';
import { getFileTypeFromExtension } from '@/common/fileUtils';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getCreateFiles, getCreateFolder } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";

interface AddFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    isFolder: boolean;
    isFile: boolean;
    folderId: string;
}

interface FormData {
    title?: string;
    file?: File | null;
    fileName?: string;
    fileType?: string;
    fileMeta?: string;
}

const AddFolderModel: React.FC<AddFolderModalProps> = ({ isOpen, onClose, isFolder, isFile, folderId }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);
    const responsesLogin = useAppSelector((state: { auth: any }) => state.auth.login?.user?.id);
    console.log(":>>>>>>>>>>>>>auth", responsesLogin);
    const isLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

    const [formData, setFormData] = useState<FormData>({});
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (name === 'file' && files) {
            const file = files[0];
            const fileType = getFileTypeFromExtension(file.name);
            setFormData(prevFormData => ({
                ...prevFormData,
                file,
                fileName: file.name,
                fileType,
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: e.target.value
            }));
        }
    };

    const handleAction = () => {
        if (isFolder) {
            if (folderId) {
                console.log("This is a Parent Folder", folderId);
                const data = {
                    user_id: responsesLogin,
                    title: formData?.title,
                    createdBy: responsesLogin,
                    updatedBy: responsesLogin,
                    parent_id: folderId
                }
                dispatch(getCreateFolder(token, data))
            }
            else {
                const data = {
                    user_id: responsesLogin,
                    title: formData?.title,
                    createdBy: responsesLogin,
                    updatedBy: responsesLogin,
                }
                dispatch(getCreateFolder(token, data))

                console.log("THis is Main Folder", folderId);
            }
        } else if (isFile && formData.file) {
            const formDataToSend = new FormData();

            formDataToSend.append('file', formData.file);
            formDataToSend.append('folderId', folderId || '');
            formDataToSend.append('fileName', formData.fileName || '');
            formDataToSend.append('fileMeta', '{"description": "Sample text file for educational purposes"}');
            formDataToSend.append('fileType', formData.fileType || '');
            dispatch(getCreateFiles(token, formDataToSend))

        }
        onClose();
    };


    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
            <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                {isLoading && <Spinner />}

                <div className="flex flex-col gap-4">
                    {isFolder && (
                        <>
                            <InputMain
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                placeholder="Enter class title"
                                label="Folder name"
                                id=""
                                radioOptions={[]}
                                type=""
                            />
                            <button
                                className="bg-gray-500 text-center py-2 px-4 border-t cursor-pointer rounded-xl text-white hover:bg-gray-600 transition duration-200 w-full"
                                onClick={handleAction}
                            >
                                Add Folder
                            </button>
                        </>
                    )}

                    {isFile && (
                        <>
                            <label className='text-sm mb-2 text-[#707070]'>Upload File</label>

                            <input
                                name="file"
                                type="file"
                                onChange={handleInputChange}
                                className="w-full"
                            />
                            <button
                                className="bg-gray-500 text-center py-2 px-4 border-t cursor-pointer rounded-xl text-white hover:bg-gray-600 transition duration-200 w-full"
                                onClick={handleAction}
                            >
                                Upload File
                            </button>
                        </>
                    )}
                </div>
            </DialogPanel>
        </Dialog>
    );
};

export default AddFolderModel;

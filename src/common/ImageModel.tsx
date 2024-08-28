
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string | null;
    contentType: 'image' | 'pdf';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, contentType }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-screen-sm max-h-screen p-4 bg-white rounded-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2"
                >
                    <FaTimes />
                </button>
                {contentType === 'pdf' ? (
                    <iframe
                        src={content || ''}
                        className="w-full h-full"
                        title="PDF preview"
                    />
                ) : (
                    <img
                        src={content || ''}
                        alt="file preview"
                        className="w-full h-full object-contain"
                    />
                )}
            </div>
        </div>
    );
};

export default Modal;

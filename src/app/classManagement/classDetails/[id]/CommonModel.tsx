import React, { useRef, useEffect } from 'react';

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, children }) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen]);

    return (
        isOpen && (
            <div
                className="absolute top-full mt-2 left-0 w-[250px] border border-gray-300 bg-white shadow-lg rounded-lg p-4 z-50"
                ref={dropdownRef}
            >
                {children}
            </div>

        )
    );
};

export default Dropdown;

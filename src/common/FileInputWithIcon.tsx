import React from 'react';

interface FileInputWithIconProps {
  icon: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const FileInputWithIcon: React.FC<FileInputWithIconProps> = ({ icon, onChange, name }) => {
  return (
    <div className="relative flex items-center  h-12  w-full border border-[#707070] rounded-md p-2 opacity-100">
      {/* File input field */}
      <input
        type="file"
        onChange={onChange}
        name={name}
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        aria-label="Upload file"
      />
      {/* Icon */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default FileInputWithIcon;

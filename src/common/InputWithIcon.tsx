import { type } from 'os';
import React from 'react';

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  value: any;
  name:string;
  type:any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, placeholder,type, value,name, onChange }) => {
  return (
    <div style={styles.container}>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        name={name}
        onChange={onChange} 
        style={styles.input}
      />
      <span style={styles.iconContainer}>{icon}</span>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '10px 40px 10px 10px', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box',
  },
};

export default InputWithIcon;

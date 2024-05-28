import React from 'react';

interface InputProps {
  label: string;
  value: string|undefined;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const TextInput: React.FC<InputProps> = ({ label, value, placeholder, onChange, type = 'text' }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-gray-800 pb-0 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-2 border-0 text-gray-300 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 bg-black bg-opacity-25"
      />
    </div>
  );
};

export default TextInput;

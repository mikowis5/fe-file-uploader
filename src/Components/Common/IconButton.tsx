import React from 'react';

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  size?: number;
  background?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, size = 50, background = 'gray-500' }) => {
  const buttonStyle = {
    width: size,
    height: size,
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={`fade-in-child flex items-center p-1 justify-center rounded-full bg-${background} text-white bg-opacity-50 hover:bg-opacity-65 cursor-pointer backdrop-blur-[5px] border border-white border-opacity-25`}
    >
      {icon}
    </button>
  );
};

export default IconButton;

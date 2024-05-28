import React from 'react';
import { useAtom } from 'jotai';
import TextInput from './Input/TextInput';
import Logo from './Logo';
import { usernameAtom, emailAtom } from './../atoms';

const Header: React.FC = () => {
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="p-5 shadow-2xl flex items-center justify-between bg-white bg-opacity-[0.03]">
      <Logo />
      <div className="flex gap-3">
        <div className="w-[200px]">
          <TextInput
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="john@doe.com"
          />
        </div>
        <div className="w-[200px]">
          <TextInput
            label="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="john@doe.com"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

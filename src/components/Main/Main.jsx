import React, { useState } from 'react';
import { NavBar } from '../NavBar';
import './Main.css';
import { Page } from '../../pages/page';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <NavBar onSearchChange={handleSearchChange} />
      <Page searchTerm={searchTerm} />
    </>
  );
};

export { Main };

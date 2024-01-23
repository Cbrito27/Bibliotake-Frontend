import React, { useState } from 'react';
import { NavBar } from '../NavBar';
import './Main.css';
import { Page } from '../../pages/page';

const Main = () => {
  return (
    <>
      <NavBar/>
      <Page/>
    </>
  );
};

export { Main };

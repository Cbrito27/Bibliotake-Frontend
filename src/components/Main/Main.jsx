import React, { useState } from "react";
import { NavBar } from "../NavBar";
import "./Main.css";
// import { Page } from '../Books';
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <>
      <div className="Main">
        <NavBar />

        <section>
          {/* <Page/> */}
          <Outlet />
        </section>
        {/* <footer>
						<p>Hecho por <a href="https://innovacion.grupoasd.com.co/" target="_blank" rel="noopener noreferrer">Hut 8</a> para <a href="https://www.grupoasd.com/" target="_blank" rel="noopener noreferrer">Grupo ASD</a></p>
					</footer> */}
      </div>
    </>
  );
};

export { Main };

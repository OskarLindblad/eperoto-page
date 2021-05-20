import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import eperotoLogo from "../images/Eperoto-Logo-1.png";
import eperotoLogoDark from "../images/Eperoto-Logo-Dark.png";
import { useLocation } from "react-router-dom";

import scrollPosition from "../modules/scrollPosition";

export default function Header({ darkColors, hideInHome }) {
  const [menuToggle, setMenuToggle] = useState(false);

  if (menuToggle) {
    setTimeout(function () {
      document.querySelector("html").style.overflow = "hidden";
    }, 500);
  } else {
    document.querySelector("html").style.overflow = "auto";
  }

  let scrolledDown = false;
  if (scrollPosition() > 50) {
    scrolledDown = true;
  }

  const { pathname } = useLocation();
  let hide = false;
  if (pathname === "/" && hideInHome) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hide = true;
  } else {
    hide = false;
  }

  return (
    <header
      className={`header ${darkColors ? "header-dark-colors" : ""}`}
      style={{ display: `${hide ? "none" : "flex"}` }}
    >
      <NavLink to="/" exact>
        {/*Needs to load booth, otherwise it will switch slower*/}
        <img
          className={`logo ${scrolledDown && "logo-scrolledDown"}`}
          id="logo"
          src={eperotoLogoDark}
          alt="Eperoto"
          onClick={() => setMenuToggle(false)}
          style={{ display: darkColors ? "inline-block" : "none" }}
        />
        <img
          className={`logo ${scrolledDown && "logo-scrolledDown"}`}
          id="logo"
          src={eperotoLogo}
          alt="Eperoto"
          onClick={() => setMenuToggle(false)}
          style={{ display: darkColors ? "none" : "inline-block" }}
        />
      </NavLink>
      <div
        id="nav-menu"
        className={menuToggle ? "menu_open" : "menu_close"}
        onClick={() => setMenuToggle(!menuToggle)}
      >
        <div id="menu-toggle">
          <div id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id="cross">
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="nav" className="fp-table">
          <div className="fp-tableCell">
            <ul className="nav_menu">
              <li className="menu-item">
                <NavLink to="/" exact activeClassName="menu-item-active">
                  Home
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/news" activeClassName="menu-item-active">
                  Latest news
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/positions" activeClassName="menu-item-active">
                  Open positions
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/contact" activeClassName="menu-item-active">
                  Contact
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/">Log In</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

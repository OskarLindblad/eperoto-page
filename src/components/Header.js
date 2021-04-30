import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import eperotoLogo from "../images/Eperoto-Logo-1.png";

export default function NavBar() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <header className="header">
      <NavLink to="/" exact>
        <img className="logo" id="logo" src={eperotoLogo} alt="Eperoto" />
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
                <NavLink to="/post" activeClassName="menu-item-active">
                  Blog Post
                </NavLink>
              </li>
              <li className="menu-item" activeClassName="menu-item-active">
                <NavLink to="/project">Projects</NavLink>
              </li>
              <li className="menu-item" activeClassName="menu-item-active">
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

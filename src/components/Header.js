import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import eperotoLogo from "../images/Eperoto-Logo-1.png";
import scrollPosition from "../modules/scrollPosition";

export default function NavBar() {
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

  return (
    <header className="header">
      <NavLink to="/" exact>
        <img
          className={`logo ${scrolledDown && "logo-scrolledDown"}`}
          id="logo"
          src={eperotoLogo}
          alt="Eperoto"
          onClick={() => setMenuToggle(false)}
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

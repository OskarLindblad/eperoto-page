import React, { useState } from "react";
import scrollPosition from "../modules/scrollPosition";
import Footer from "./Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  let scrolledDown = false;
  if (scrollPosition() > 50) {
    scrolledDown = true;
  }

  const sumbit = () => {
    let send = true;
    // Resets error
    setNameError("");
    setEmailError("");
    setCompanyError("");
    setMessageError("");

    const namePattern =
      /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'-]+$/;
    const emptyPattern = /^$|\s+/;

    // Name validation
    if (!namePattern.test(name)) {
      setNameError("Invalid name");
      send = false;
    }
    if (emptyPattern.test(name)) {
      setNameError("This field can't be empty");
      send = false;
    }

    const emailPattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    // Email validation
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email");
      send = false;
    }
    if (emptyPattern.test(email)) {
      setEmailError("This field can't be empty");
      send = false;
    }

    // Company validation - no available pattern...
    if (emptyPattern.test(company)) {
      setCompanyError("This field can't be empty");
      send = false;
    }

    // Message validation - no available pattern...
    if (emptyPattern.test(message)) {
      setMessageError("This field can't be empty");
      send = false;
    }

    if (send) {
      let messageObj = {
        name: name,
        email: email,
        company: company,
        message: message,
      };
      messageObj = JSON.parse(messageObj);
      console.log(messageObj);
    }
  };

  return (
    <>
      <main className="Contacts-page">
        <div
          className={` ${
            scrolledDown
              ? "Contacts-page-header-background"
              : "hidden-header-background"
          } header-background-transition
`}
        ></div>
        <h4 className="Contacts-page-caption">Contact Us</h4>
        <div className="Contacts-page-field-Name Contacts-page-field">
          <label>
            Name
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              maxLength="40"
              autoComplete="nope"
            ></input>
            {nameError && (
              <p className="Contacts-page-error-msg">{nameError}</p>
            )}
          </label>
        </div>
        <div className="Contacts-page-field-Email Contacts-page-field">
          <label>
            Email
            <input
              type="text"
              maxLength="40"
              autoComplete="nope"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {emailError && (
              <p className="Contacts-page-error-msg">{emailError}</p>
            )}
          </label>
        </div>
        <div className="Contacts-page-field-Company Contacts-page-field">
          <label>
            Company
            <input
              type="text"
              maxLength="40"
              autoComplete="nope"
              onChange={(e) => setCompany(e.target.value)}
            ></input>
            {companyError && (
              <p className="Contacts-page-error-msg">{companyError}</p>
            )}
          </label>
        </div>
        <div className="Contacts-page-field-Message Contacts-page-field">
          <label>
            Message
            <textarea
              type="text"
              maxLength="40"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {messageError && (
              <p className="Contacts-page-error-msg">{messageError}</p>
            )}
          </label>
        </div>
        <button type="submit" className="Contacts-page-btn" onClick={sumbit}>
          Send
        </button>
      </main>
      <Footer />
    </>
  );
}

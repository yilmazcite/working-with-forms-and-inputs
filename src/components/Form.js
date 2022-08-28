import React from "react";
import useInput from "../hooks/use-input";

const Form = () => {
  const validateNameInput = (input) => {
    return input.trim() !== "";
  };

  const validateEmailInput = (input) => {
    const emailValidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return input.toLowerCase().match(emailValidation);
  };

  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: hasNameInputError,
    onInputBlur: nameInputOnBlur,
    onInputChange: nameInputOnChange,
    reset: resetNameInput,
  } = useInput(validateNameInput);

  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: hasEmailInputError,
    onInputBlur: emailInputOnBlur,
    onInputChange: emailInputOnChange,
    reset: resetEmailInput,
  } = useInput(validateEmailInput);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid && !emailIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Your name:</label>
        <input
          type="text"
          value={enteredName}
          onChange={nameInputOnChange}
          onBlur={nameInputOnBlur}
        />
        <label>Your email address:</label>
        <input
          value={enteredEmail}
          onChange={emailInputOnChange}
          onBlur={emailInputOnBlur}
        />
        <button disabled={!nameIsValid || !emailIsValid}>Submit</button>
      </form>
      {hasNameInputError && <p>Name cannot be empty.</p>}
      {hasEmailInputError && <p>Please enter a valid email address.</p>}
    </div>
  );
};

export default Form;

/*
SAME LOGIC WITHOUT A CUSTOM HOOK:

import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //dynamically check the input fields.
  //store false if the input is empty and true if not empty:
  const nameValidCheck = name.trim() !== "";
  const emailValidCheck = email.toLowerCase().match(emailValidation);

  const formIsValid = nameValidCheck && emailValidCheck;

  const nameInputInvalid = !nameValidCheck && nameTouched;
  const emailInputInvalid = !emailValidCheck && emailTouched;

  const nameBlurHandler = (e) => {
    setNameTouched(true);
  };

  const emailBlurHandler = (e) => {
    setEmailTouched(true);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);

    if (e.target.value.trim() !== "") {
      setNameTouched(false);
      return;
    }
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);

    if (emailValidCheck) {
      setEmailTouched(false);
      return;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setNameTouched(true);

    if (!nameValidCheck && !emailValidCheck) {
      return;
    }

    console.log(name, email);

    setName("");
    setEmail("");
    setNameTouched(false);
    setEmailTouched(false);
  };

  return (
    <div>
      <h1>Fill Out the Form</h1>
      <form onSubmit={submitHandler}>
        <label>Your name:</label>
        <input
          type="text"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        <label>Your email:</label>
        <input
          type="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <button disabled={!formIsValid}>Submit</button>
      </form>
      {nameInputInvalid && <p>Name cannot be empty.</p>}
      {emailInputInvalid && <p>Please enter a valid email address.</p>}
    </div>
  );
}

export default App;
*/

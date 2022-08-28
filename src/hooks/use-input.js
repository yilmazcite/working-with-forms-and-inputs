import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const hasError = !isValid && isTouched;

  const onInputBlur = () => {
    setIsTouched(true);
  };

  const onInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    onInputBlur,
    onInputChange,
    reset,
  };
};

export default useInput;

import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import { useRef } from "react";

const OTP_DIGIT_LENGTH = 5;
const OTPInputBox = ({ no_of_digits }) => {
  //Create an Empty array based on the no_of_digits
  const handlePaste = (e) => {
    e.preventDefault();
    console.log("The pasted event is ", e);
    const pastedData = e.clipboardData.getData("Text").trim();
    console.log("The Trimmed pasteddata us ", pastedData);
    const digits = pastedData.split("").filter((char) => !isNaN(char));

    if (digits.length === 0) return;

    const newArray = [...inputArray];
    for (let i = 0; i < no_of_digits; i++) {
      if (digits[i]) {
        newArray[i] = digits[i];
      }
    }

    setinputArray(newArray);

    // Move focus to the next empty input (or last)
    const firstEmptyIndex = newArray.findIndex((v) => v === "");
    const focusIndex =
      firstEmptyIndex === -1 ? no_of_digits - 1 : firstEmptyIndex;
    inputRef.current[focusIndex]?.focus();
  };

  console.log("The current length is ", no_of_digits);
  const [inputArray, setinputArray] = useState(
    new Array(no_of_digits).fill("")
  );
  const inputRef = useRef([]);
  useEffect(() => {
    console.log("The current ref is", inputRef);
    inputRef.current[0]?.focus();
  }, []);
  console.log("The input array is ", inputArray);
  const handleInputChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }
    const newValue = value.trim();
    const newArray = [...inputArray];
    console.log("The value before slicing", newValue);
    newArray[index] = newValue.slice(-1);
    console.log("The new Array Stored is ", newArray);

    setinputArray(newArray);
    newValue && inputRef.current[index + 1]?.focus();
    console.log("The input array is", inputArray);
  };
  const handleOnKeyDown = (e, index) => {
    console.log("THe keydown event is ", e);
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <>
      {inputArray.map((input, index) => (
        <input
          className="input-box-container"
          key={index}
          value={input}
          ref={(input) => (inputRef.current[index] = input)}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          onPaste={handlePaste}
        ></input>
      ))}
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Validating OTP</h1>
      <OTPInputBox no_of_digits={OTP_DIGIT_LENGTH} />
    </div>
  );
}

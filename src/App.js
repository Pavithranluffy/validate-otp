import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import { useRef } from "react";

const OTP_DIGIT_LENGTH = 5;
const OTPInputBox = ({ no_of_digits }) => {
  //Create an Empty array based on the no_of_digits
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

import React, { useState } from 'react';

function NumberInput({changeFunc}) {
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');

  // Handler function to update the input value
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value >= 1 && value <= 10) {
      setInputValue(value);
      changeFunc(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="numberInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberInput;

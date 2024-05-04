'use client'

import React, { useState } from 'react';

const MobileNumberInput = () => {
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryCodeChange = (e: any) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e:any) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 10) {
      setPhoneNumber(input);
    }
  };

  return (
    <div className="flex items-center">
      <select
        value={countryCode}
        onChange={handleCountryCodeChange}
        className="py-2 px-3 rounded-l border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="+1">+1 (USA)</option>
        <option value="+91">+91 (India)</option>
        {/* Add more country codes as needed */}
      </select>
      <input
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter your mobile number"
        maxLength={10}
        className="py-2 px-3 rounded-r border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default MobileNumberInput;

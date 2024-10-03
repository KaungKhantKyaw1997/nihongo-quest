import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  label: string;
  placeholder: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  label,
  placeholder,
  onChange,
  defaultValue = "",
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="block appearance-none w-full bg-[color:var(--secondary-black)] text-white py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Image
            src="/down-arrow.svg"
            alt="Down Arrow Logo"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectBox;

import React from "react";
import Image from "next/image";

interface SwitchToggleProps {
  isChecked: boolean;
  onToggle: () => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ isChecked, onToggle }) => {
  return (
    <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-lg bg-[color:var(--secondary-black)] p-1">
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={onToggle}
      />
      <span
        className={`flex items-center space-x-[6px] rounded-md py-1 px-[16px] text-sm font-medium ${
          isChecked
            ? "text-white bg-[color:var(--primary-black)]"
            : "text-gray-400"
        }`}
      >
        <Image
          src="/japan.svg"
          alt="Japan Logo"
          className={"me-2"}
          width={32}
          height={32}
        />
        Japanese
      </span>
      <span
        className={`flex items-center space-x-[6px] rounded-md py-1 px-[16px] text-sm font-medium ${
          !isChecked
            ? "text-white bg-[color:var(--primary-black)]"
            : "text-gray-400"
        }`}
      >
        <Image
          src="/english.svg"
          alt="English Logo"
          className={"me-2"}
          width={32}
          height={32}
        />
        English
      </span>
    </label>
  );
};

export default SwitchToggle;

"use client";
import SelectBox from "../components/SelectBox";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [character, setCharacter] = useState("");
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const typeOptions = [
    { value: "hiragana", label: "Hiragana" },
    { value: "katakana", label: "Katakana" },
    { value: "kanji", label: "Kanji" },
  ];

  const levelOptions = [
    { value: "basic", label: "Basic" },
    { value: "advanced", label: "Advanced" },
  ];

  const handleTypeChange = (value: any) => {
    setSelectedType(value);
  };

  const handleLevelChange = (value: any) => {
    setSelectedLevel(value);
  };

  const fetchCharacterData = async () => {
    if (!selectedType || !selectedLevel) return;

    try {
      const response = await fetch(
        `https://nihongo-x.onrender.com/api/random-character/${selectedType}?level=${selectedLevel}&count=6`
      );
      const data = await response.json();

      setCharacter(data.character);
      setOptions(data.options);
      setCorrect(data.correct);
      setSelectedOption("");
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [selectedType, selectedLevel]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex justify-center items-end mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
          Nihongo Quest
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <SelectBox
          options={typeOptions}
          label="Choose a Type"
          placeholder="Select type..."
          onChange={handleTypeChange}
        />
        <SelectBox
          options={levelOptions}
          label="Choose a Level"
          placeholder="Select level..."
          onChange={handleLevelChange}
        />
      </div>

      {character ? (
        <div className="flex flex-col items-center justify-center w-full mb-16 mt-8">
          <div
            className="flex self-end cursor-pointer"
            onClick={fetchCharacterData}
          >
            <Image
              src="/refresh.svg"
              alt="Refresh Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="text-6xl font-bold text-red-500">{character}</div>
        </div>
      ) : (
        <div></div>
      )}

      {options.length > 0 ? (
        <div className="grid w-full grid-cols-3 gap-2">
          {options.map((option, index) => {
            let borderRadiusClass = "";
            if (index === 0) borderRadiusClass = "rounded-tl-lg";
            if (index === 2) borderRadiusClass = "rounded-tr-lg";
            if (index === 3) borderRadiusClass = "rounded-bl-lg";
            if (index === 5) borderRadiusClass = "rounded-br-lg";

            const bgColorClass = selectedOption
              ? option === correct
                ? "bg-green-100"
                : option === selectedOption
                ? "bg-red-100"
                : "bg-gray-100"
              : "bg-gray-100";

            return (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`flex items-center justify-center p-4 text-lg font-semibold text-gray-700 cursor-pointer ${bgColorClass} ${borderRadiusClass}`}
              >
                {option}
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

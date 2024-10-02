"use client";
import SelectBox from "../components/SelectBox";
import SwitchToggle from "../components/SwitchToggle";
import { useState, useEffect } from "react";
import Image from "next/image";

type CharacterType = "hiragana" | "katakana" | "kanji";
type LevelType = "basic" | "advanced";

interface CharacterData {
  character: string;
  options: string[];
  correct: string;
}

export default function Home() {
  const [selectedType, setSelectedType] = useState<CharacterType | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelType | null>(null);
  const [character, setCharacter] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isJapanese, setIsJapanese] = useState<boolean>(true);

  const typeOptions = [
    { value: "hiragana", label: "Hiragana" },
    { value: "katakana", label: "Katakana" },
    { value: "kanji", label: "Kanji" },
  ];

  const levelOptions = [
    { value: "basic", label: "Basic" },
    { value: "advanced", label: "Advanced" },
  ];

  const handleTypeChange = (value: string) => {
    setSelectedType(value as CharacterType);
  };

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value as LevelType);
  };

  const fetchCharacterData = async () => {
    if (!selectedType || !selectedLevel) return;

    const endpoint = isJapanese
      ? `https://nihongo-x.onrender.com/api/jpn-random-character/${selectedType}?level=${selectedLevel}&count=6`
      : `https://nihongo-x.onrender.com/api/eng-random-character/${selectedType}?level=${selectedLevel}&count=6`;

    try {
      const response = await fetch(endpoint);
      const data: CharacterData = await response.json();

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
  }, [selectedType, selectedLevel, isJapanese]);

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

      {character && (
        <div className="flex items-center justify-center mt-2">
          <SwitchToggle
            isChecked={isJapanese}
            onToggle={() => setIsJapanese((prev) => !prev)}
          />
        </div>
      )}

      {character && (
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
      )}

      {options.length > 0 && (
        <div className="grid w-full grid-cols-3 gap-2">
          {options.map((option, index) => {
            const borderRadiusClass =
              index === 0
                ? "rounded-tl-lg"
                : index === 2
                ? "rounded-tr-lg"
                : index === 3
                ? "rounded-bl-lg"
                : index === 5
                ? "rounded-br-lg"
                : "";

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
      )}
    </div>
  );
}

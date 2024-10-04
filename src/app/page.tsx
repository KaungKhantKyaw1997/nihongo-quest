"use client";
import dynamic from "next/dynamic";
import SelectBox from "../components/SelectBox";
import SwitchToggle from "../components/SwitchToggle";
const LoadingSpinner = dynamic(() => import("../components/LoadingSpinner"), {
  ssr: false,
});
import { useState, useEffect } from "react";
import Image from "next/image";

type CharacterType = "hiragana" | "katakana";
type LevelType = "basic" | "advanced";

interface CharacterData {
  character: string;
  options: string[];
  correct: string;
}

export default function Home() {
  const [selectedType, setSelectedType] = useState<CharacterType>("hiragana");
  const [selectedLevel, setSelectedLevel] = useState<LevelType>("basic");
  const [character, setCharacter] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isJapanese, setIsJapanese] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const typeOptions = [
    { value: "hiragana", label: "Hiragana" },
    { value: "katakana", label: "Katakana" },
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

    setLoading(true);

    try {
      const response = await fetch(endpoint);
      const data: CharacterData = await response.json();

      setCharacter(data.character);
      setOptions(data.options);
      setCorrect(data.correct);
      setSelectedOption("");
      setSuccessMessage("");
    } catch (error) {
      console.error("Error fetching character data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [selectedType, selectedLevel, isJapanese, refresh]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    if (option === correct) {
      setSuccessMessage("Correct! Well done!");

      setTimeout(() => {
        setSuccessMessage("");
        setRefresh((prev) => prev + 1);
      }, 500);
    } else {
      setSuccessMessage("Wrong! Try again!");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-end mb-12">
        <h1 className="neon text-3xl md:text-5xl font-bold tracking-wider font-[family-name:var(--font-japan-rich)]">
          Nihongo Quest
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <SelectBox
          options={typeOptions}
          label="Choose a Type"
          placeholder="Select type..."
          onChange={handleTypeChange}
          defaultValue="hiragana"
        />
        <SelectBox
          options={levelOptions}
          label="Choose a Level"
          placeholder="Select level..."
          onChange={handleLevelChange}
          defaultValue="basic"
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

      <div className="flex flex-col items-center justify-center w-full mb-16 mt-8">
        {character && (
          <div
            className="flex self-end cursor-pointer"
            onClick={() => setRefresh((prev) => prev + 1)}
          >
            <Image
              src="/refresh.svg"
              alt="Refresh Logo"
              width={32}
              height={32}
            />
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-6xl font-bold text-red-500">{character}</div>
        )}
      </div>

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
              ? option === correct && option === selectedOption
                ? "text-green-400"
                : option === selectedOption
                ? "text-red-400"
                : "text-gray-400"
              : "text-gray-400";

            return (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`flex items-center justify-center p-4 text-lg font-semibold bg-[color:var(--secondary-black)] cursor-pointer ${bgColorClass} ${borderRadiusClass} transition-transform transform hover:scale-105 active:scale-95`}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}

      {successMessage && (
        <div className="text-center mt-4">
          <span
            className={
              successMessage === "Correct! Well done!"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {successMessage}
          </span>
        </div>
      )}
    </div>
  );
}

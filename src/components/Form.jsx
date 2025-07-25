import { useState } from "react";
import sendImage from "../assets/send.png";
import symbolTranslate from "../assets/translate.png";

const languages = [
  "English",
  "Spanish",
  "Mandarin",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Hindi",
];

export default function Form({ onSend, onTranslate }) {
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      onTranslate(inputText, selectedLanguage);
      setInputText("");
    }
  }

  return (
    <form className="chat__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat__input"
        id="text"
        placeholder="Write here to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        autoComplete="off"
        maxLength="70"
      />
      <div className="chat__inputs">
        <div className="chat__selectImg">
          <img src={symbolTranslate} alt="Symbol Translate" />
          <select
            className="chat__select"
            id="languages"
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <button className="chat__button">
          <img src={sendImage} alt="send" />
        </button>
      </div>
    </form>
  );
}

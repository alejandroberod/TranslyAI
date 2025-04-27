import { useState } from "react";
import sendImage from "../assets/send.png";
import symbolTranslate from "../assets/translate.png";

export default function Form({ onSend }) {
  const [inputText, setInputText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
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
      />
      <div className="chat__inputs">
        <div className="chat__selectImg">
          <img src={symbolTranslate} alt="Symbol Translate" />
          <select className="chat__select" id="languages">
            <option value="spanish">Spanish</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>
        <button className="chat__button">
          <img src={sendImage} alt="send" />
        </button>
      </div>
    </form>
  );
}

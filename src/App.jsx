import { useState } from 'react';

import Header from './components/Header';
import Form from './components/Form';
import Messages from './components/Messages/Messages';
import { translate } from './http';
import './index.css'

function App() {
  const [messages, setMessages] = useState([]);

  function handleSend(newMessageText) {
    const newMessage = {
      id: Date.now(),
      text: newMessageText,
      isBot: false
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);    
  }

  async function handleTranslate(text, lang) {
    const respuesta = await translate(text, lang);
    const newMessage = {
      id: Date.now(),
      text: respuesta.translatedText,
      isBot: true
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  return (
    <div className="chat">
      <Header />
      <Messages messages={messages}/>
      <Form onSend={handleSend} onTranslate={handleTranslate}/>
    </div>
  )
}

export default App

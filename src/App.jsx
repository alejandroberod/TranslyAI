import './index.css'
import Header from './components/Header';
import Form from './components/Form';
import Messages from './components/Messages/Messages';
import { useState } from 'react';

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

  return (
    <div className="chat">
      <Header />
      <Messages messages={messages}/>
      <Form onSend={handleSend}/>
    </div>
  )
}

export default App

import './index.css'
import Header from './components/Header';
import Form from './components/Form';
import Messages from './components/Messages/Messages';

function App() {

  return (
    <div className="chat">
      <Header />
      <Messages />
      <Form />
    </div>
  )
}

export default App

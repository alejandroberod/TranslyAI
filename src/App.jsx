import './index.css'
import headerImage from './assets/header.png';
import sendImage from './assets/send.png';

function App() {

  return (
    <div className="chat">
      <header className="chat__header">
        <img src={headerImage} alt="bot" className='chat__header-image'/>
        <div className="chat__title-status">
          <h3 className="chat__title">TranslyAI</h3>
          <p className="chat__status">Online</p>
        </div>
      </header>
      <section className="chat__messages">
        <div>
          
        </div>
      </section>
      <form className="chat__form">
        <input type="text" className='chat__input' id="text" placeholder='Write here to translate'/>
        <div className="chat__inputs">
          <select className="chat__select" id="languages">
            <option value="spanish">Spanish</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
          <button className='chat__button'>
            <img src={sendImage} alt="send" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default App

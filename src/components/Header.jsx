import headerImage from '../assets/header.png';

export default function Header() {
  return (
    <header className="chat__header">
      <img src={headerImage} alt="bot" className='chat__header-image'/>
      <div className="chat__title-status">
        <h3 className="chat__title">TranslyAI</h3>
        <p className="chat__status">Online</p>
      </div>
    </header>
  )
}
import imageBot from '../../assets/bot.png';

export default function Message({text, isBot}) {

  let message;
  if (isBot) {
    message = 
    <div className='messages__bot'>
      <img src={imageBot} alt="profile bot" />
      <div className='bot__text'>{text}</div>
    </div>
  } else {
    message = <div className='messages__user'>{text}</div>
  }

  return message;
}
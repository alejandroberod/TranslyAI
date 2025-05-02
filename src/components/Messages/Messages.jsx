import { useEffect, useRef } from "react";
import Message from "./Message";

export default function Messages({messages}) {

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="chat__messages" ref={containerRef}>
      {messages.map((message) => (
        <Message key={message.id} text={message.text} isBot={message.isBot} />
      ))}
    </section>
  );
}

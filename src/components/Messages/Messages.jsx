/* eslint-disable */

// import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const Messages = () => {
  const [messages, setMessages] = useLocalStorage('messages', []);

  return (
    <div>
      {messages.map((el, index) => (
        <p key={index}>{el.message}</p>
      ))}
    </div>
  );
}

// export default Messages;

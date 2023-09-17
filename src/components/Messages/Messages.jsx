/* eslint-disable */

// import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { getData } from '../../helpers/helpers';


export const Messages = () => {
  const [messages, setMessages] = useLocalStorage('messages', []);
  const [user] = useLocalStorage('user', null);

  useEffect(() => {
    getData(`notifications/${user.id}`)
    .then((res) => setMessages(res));
  }, [])

  console.log(messages);

  return (
    <div>
      {messages.map((el, index) => (
        <p key={index}>{el.message}</p>
      ))}
    </div>
  );
}

// export default Messages;

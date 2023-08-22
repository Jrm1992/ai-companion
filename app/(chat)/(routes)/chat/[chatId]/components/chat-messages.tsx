'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';

import { Companion } from '@prisma/client';

import { ChatMessage, ChatMessageProps } from './chat-message';

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const demoMessage = `and this is an example of this app, if you want the complete source code, please visit https://github.com/Jrm1992/ai-companion and provide your own .env file with your data.`;

export default function ChatMessages({
  messages = [],
  isLoading,
  companion
}: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<'div'>>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name} ${demoMessage}`}
        isLoading={fakeLoading}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}

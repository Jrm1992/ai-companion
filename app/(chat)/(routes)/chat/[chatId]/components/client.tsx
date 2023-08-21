'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Companion, Message } from '@prisma/client';
import { useCompletion } from 'ai/react';

import ChatHeader from './chat-header';
import { ChatMessageProps } from './chat-message';
import ChatMessages from './chat-messages';
import { ChatForm } from './chat.form';

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export default function ChatClient({ companion }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: 'system',
          content: completion
        };

        setMessages((current) => [...current, systemMessage]);
        setInput('');

        router.refresh();
      }
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        companion={companion}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

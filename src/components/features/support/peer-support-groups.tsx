"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
}

export function PeerSupportGroups() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Anonymous');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), user: username, text: newMessage },
      ]);
      setNewMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Peer Support Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border p-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </ScrollArea>
        <div className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
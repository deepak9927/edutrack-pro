"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export default function CommunicationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      sender: "John Doe",
      content: "Hi, I have a question about the assignment.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
    {
      id: "msg_2",
      sender: "Jane Smith",
      content: "Sure, what's your question?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, { 
        id: `msg_${messages.length + 1}`, 
        sender: "You", 
        content: newMessage, 
        timestamp: new Date() 
      }]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Teacher-Student Communication</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Message List */}
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id} className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">{message.sender}</p>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                  <p className="text-xs text-right">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
            
            {/* New Message Form */}
            <div>
              <Textarea
                placeholder="Enter your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage} className="mt-2 w-full">
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
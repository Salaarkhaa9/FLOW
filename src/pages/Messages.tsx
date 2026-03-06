import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "John Smith",
    role: "Driver",
    lastMessage: "I'll be at the pickup location in 30 minutes",
    time: "2 min",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "ABC Freight Co.",
    role: "Shipper",
    lastMessage: "The load is ready for pickup",
    time: "15 min",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    role: "Dispatcher",
    lastMessage: "Updated the route for LD-12345",
    time: "1 hr",
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: "Mike Johnson",
    role: "Driver",
    lastMessage: "Delivered successfully, sending POD",
    time: "2 hr",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "XYZ Logistics",
    role: "Broker",
    lastMessage: "Can you handle this load?",
    time: "3 hr",
    unread: 0,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "John Smith",
    content: "Hey, I'm on my way to the pickup location",
    time: "10:30 AM",
    isMine: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Great! The shipper is expecting you. Load ID is LD-12345",
    time: "10:32 AM",
    isMine: true,
    read: true,
  },
  {
    id: 3,
    sender: "John Smith",
    content: "Got it. Any special instructions for this load?",
    time: "10:35 AM",
    isMine: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Yes, it's fragile electronics. Make sure to get temperature-controlled trailer confirmation",
    time: "10:36 AM",
    isMine: true,
    read: true,
  },
  {
    id: 5,
    sender: "John Smith",
    content: "Will do. I'll send you a photo once loaded",
    time: "10:38 AM",
    isMine: false,
  },
  {
    id: 6,
    sender: "John Smith",
    content: "I'll be at the pickup location in 30 minutes",
    time: "10:45 AM",
    isMine: false,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  return (
    <DashboardLayout title="Messages">
      <div className="h-[calc(100vh-12rem)]">
        <Card className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Conversation List */}
            <div className="border-r border-border">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9" />
                </div>
              </div>
              <ScrollArea className="h-[calc(100%-5rem)]">
                <div className="space-y-1 p-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation.id === conv.id
                          ? "bg-primary/10"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {conv.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-chart-1 border-2 border-card rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium truncate">{conv.name}</span>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 && (
                            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedConversation.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.role}
                      {selectedConversation.online && (
                        <span className="text-chart-1 ml-2">● Online</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.isMine
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-accent rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs ${
                            message.isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          <span>{message.time}</span>
                          {message.isMine && message.read && (
                            <CheckCheck className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

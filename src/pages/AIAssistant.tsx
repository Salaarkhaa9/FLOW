import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Zap,
  Send,
  Bot,
  User,
  Truck,
  Package,
  DollarSign,
  MapPin,
  Lightbulb,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const suggestedPrompts = [
  {
    icon: Package,
    title: "Find available loads",
    prompt: "Find me available loads from Chicago to Dallas this week",
  },
  {
    icon: Truck,
    title: "Optimize routes",
    prompt: "What's the most efficient route for my fleet today?",
  },
  {
    icon: DollarSign,
    title: "Rate analysis",
    prompt: "Analyze current market rates for the LA to Phoenix lane",
  },
  {
    icon: TrendingUp,
    title: "Performance insights",
    prompt: "Give me a summary of my fleet performance this month",
  },
];

const aiInsights = [
  {
    type: "opportunity",
    title: "Hot Lane Alert",
    description: "Chicago → Dallas rates are 15% above average. Consider prioritizing this lane.",
    icon: TrendingUp,
    color: "text-chart-1",
  },
  {
    type: "warning",
    title: "Maintenance Due",
    description: "TRK-003 is due for scheduled maintenance in 500 miles.",
    icon: AlertCircle,
    color: "text-chart-4",
  },
  {
    type: "tip",
    title: "Fuel Savings",
    description: "Route optimization could save $340 in fuel costs this week.",
    icon: Lightbulb,
    color: "text-primary",
  },
];

const chatHistory = [
  {
    role: "assistant",
    content: "Hello! I'm your AI logistics assistant. I can help you with route optimization, load matching, rate analysis, and fleet management. How can I assist you today?",
  },
  {
    role: "user",
    content: "What loads are available from Chicago this week?",
  },
  {
    role: "assistant",
    content: "I found 12 available loads departing from Chicago this week:\n\n🚛 **Top Opportunities:**\n1. Chicago → Dallas | $2,450 | Dry Van | Pickup: Tomorrow\n2. Chicago → Atlanta | $1,890 | Reefer | Pickup: Wed\n3. Chicago → Denver | $2,100 | Flatbed | Pickup: Thu\n\nWould you like me to provide more details on any of these loads or filter by specific criteria?",
  },
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");

  return (
    <DashboardLayout title="AI Assistant">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b border-border py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Logistics Assistant</CardTitle>
                <CardDescription>Powered by advanced AI • Always learning</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-accent rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Suggested Prompts */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Suggested:</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {suggestedPrompts.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <Button
                    key={prompt.title}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setMessage(prompt.prompt)}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {prompt.title}
                  </Button>
                );
              })}
            </div>
            
            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your logistics..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </div>
              <CardDescription>Real-time recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, i) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 bg-accent/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`h-4 w-4 ${insight.color}`} />
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Match Available Loads
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Optimize Today's Routes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Analyze Lane Rates
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="h-4 w-4 mr-2" />
                Fleet Status Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Pro Tip</h4>
                  <p className="text-xs text-muted-foreground">
                    Ask the AI to analyze your historical data for patterns and opportunities you might be missing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

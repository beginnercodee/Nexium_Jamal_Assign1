"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);

  const allQuotes: Record<string, string[]> = {
    success: [
      "Success is not final; failure is not fatal: It is the courage to continue that counts.",
      "Don't watch the clock; do what it does. Keep going.",
      "The secret of success is to do the common thing uncommonly well.",
    ],
    motivation: [
      "Push yourself, because no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Success doesn’t just find you. You have to go out and get it.",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = allQuotes[topic.toLowerCase()] || ["No quotes found for this topic."];
    setQuotes(selected);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter a topic (e.g., success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Generate</Button>
      </form>

      <div className="space-y-2">
        {quotes.map((quote, idx) => (
          <p key={idx} className="text-muted-foreground border-l-4 pl-4 border-neutral-300">
            {quote}
          </p>
        ))}
      </div>
    </div>
  );
}

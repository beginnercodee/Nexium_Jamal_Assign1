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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <h1 className="text-white text-3xl font-bold text-center mb-4">Motivational Quote Generator</h1>
        <p className="text-white/80 text-center mb-6">Enter a topic like <span className="italic">success</span> or <span className="italic">motivation</span></p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="e.g., success"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/30 placeholder-white text-white focus-visible:ring-white"
          />
          <Button type="submit" className="bg-white text-indigo-700 hover:bg-indigo-100 w-full sm:w-auto">
            Generate
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          {quotes.map((quote, idx) => (
            <p key={idx} className="text-white/90 border-l-4 border-white/30 pl-4 italic">
              “{quote}”
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

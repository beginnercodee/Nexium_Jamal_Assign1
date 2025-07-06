"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const gradients = [
  "from-purple-700 via-indigo-700 to-blue-700",
  "from-pink-600 via-red-500 to-yellow-500",
  "from-green-400 via-emerald-600 to-teal-700",
  "from-indigo-800 via-purple-700 to-pink-600",
  "from-cyan-500 via-sky-600 to-blue-700",
];

const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

export function QuoteForm() {
  const { setTheme, theme } = useTheme();

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
    focus: [
      "Focus on being productive instead of busy.",
      "You get what you focus on — so focus wisely.",
      "Where focus goes, energy flows.",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = allQuotes[topic.toLowerCase()] || [
      "No quotes found for this topic.",
    ];
    setQuotes(selected);
  };

  const handleRandom = () => {
    const all = Object.values(allQuotes).flat();
    const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);
    setQuotes(shuffled);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${randomGradient} p-4 text-white relative`}
    >
      <div className="absolute inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-md z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-xl"
      >
        {/* Nexium Logo */}
        <header className="absolute top-6 left-6 text-white text-xl font-bold tracking-wide select-none">
          Nexium<span className="text-yellow-300">Quotes</span>
        </header>

        {/* 🌗 Dark Mode Toggle Button */}
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-4">
          Motivational Quote Generator
        </h1>
        <p className="text-white/80 text-center mb-6">
          Enter a topic like <span className="italic">success</span>, or try
          random mode.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-white/60 w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="e.g., success"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="pl-10 bg-white/30 placeholder-white text-white focus-visible:ring-white"
            />
          </div>

          <Button
            type="submit"
            className="bg-white text-indigo-700 hover:bg-indigo-100 w-full sm:w-auto"
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={handleRandom}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4" /> Random
          </Button>
        </form>

        <AnimatePresence>
          <motion.div
            className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {quotes.map((quote, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl scale-150 group-hover:opacity-40 transition-all duration-500 z-0" />
                <p className="relative z-10 italic leading-relaxed text-balance">
                  “{quote}”
                </p>
              </motion.div>
            ))}
          </motion.div>
          <footer className="mt-8 text-center text-sm text-white/70 dark:text-white/50">
            Built with ❤️ using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Tailwind CSS
            </a>{" "}
            &{" "}
            <a
              href="https://ui.shadcn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              ShadCN UI
            </a>{" "}
            by <span className="font-semibold text-white">Jamal Nadeem</span>{" "}
            🎮⚡🎯💫
          </footer>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

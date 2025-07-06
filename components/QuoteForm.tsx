"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function QuoteForm() {
  const { setTheme, theme } = useTheme();

  const [randomGradient, setRandomGradient] = useState("");
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const allQuotes: Record<string, string[]> = {
    success: [
      "Success is not final; failure is not fatal: It is the courage to continue that counts.",
      "Don't watch the clock; do what it does. Keep going.",
      "The secret of success is to do the common thing uncommonly well.",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Success usually comes to those who are too busy to be looking for it.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "Opportunities don't happen. You create them.",
      "Don't be afraid to give up the good to go for the great.",
      "I never dreamed about success, I worked for it.",
      "Success seems to be connected with action.",
      "People who are successful decide they are going to be successful.",
      "There is no elevator to success — you have to take the stairs.",
      "Success is liking yourself, liking what you do, and liking how you do it.",
      "Success isn’t always about greatness. It’s about consistency.",
      "Start where you are. Use what you have. Do what you can.",
    ],
    motivation: [
      "Push yourself, because no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Success doesn’t just find you. You have to go out and get it.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Dream bigger. Do bigger.",
      "Don’t stop when you’re tired. Stop when you’re done.",
      "Wake up with determination. Go to bed with satisfaction.",
      "Do something today that your future self will thank you for.",
      "Little things make big days.",
      "It’s going to be hard, but hard does not mean impossible.",
      "Don’t wait for opportunity. Create it.",
      "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
      "The key to success is to focus on goals, not obstacles.",
      "Keep going. Everything you need will come to you at the perfect time.",
      "Be stronger than your excuses.",
    ],
    focus: [
      "Focus on being productive instead of busy.",
      "You get what you focus on — so focus wisely.",
      "Where focus goes, energy flows.",
      "Stay focused and never give up.",
      "Focus is the key to success.",
      "Starve your distractions. Feed your focus.",
      "Don’t dwell on what went wrong. Focus on what to do next.",
      "You can’t depend on your eyes when your imagination is out of focus.",
      "Your life is controlled by what you focus on.",
      "Focus like a laser, not a flashlight.",
      "Focus is more important than intelligence.",
      "What you focus on expands.",
      "Concentrate all your thoughts upon the work in hand.",
      "Keep your eyes on the stars and your feet on the ground.",
      "Discipline is just choosing between what you want now and what you want most.",
    ],
    discipline: [
      "Discipline is the bridge between goals and accomplishment.",
      "We do today what they won’t, so tomorrow we accomplish what they can’t.",
      "The pain of discipline is far less than the pain of regret.",
      "Discipline is choosing between what you want now and what you want most.",
      "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
      "Without self-discipline, success is impossible, period.",
      "Discipline turns ability into achievement.",
      "Self-control is strength. Right thought is mastery.",
      "The first and best victory is to conquer self.",
      "Your level of success is determined by your level of discipline and perseverance.",
      "Don’t count the days, make the days count — with discipline.",
      "Discipline is the foundation of a successful and meaningful life.",
      "You are what you do, not what you say you’ll do.",
      "Discipline creates lifestyle; habits define your future.",
      "The price of discipline is always less than the pain of regret.",
    ],
    resilience: [
      "Resilience is knowing that you are the only one that has the power to pick yourself up.",
      "It’s not whether you get knocked down, it’s whether you get up.",
      "Rock bottom became the solid foundation on which I rebuilt my life.",
      "Tough times never last, but tough people do.",
      "You may have to fight a battle more than once to win it.",
      "Persistence and resilience only come from having been given the chance to work through difficult problems.",
      "Resilience is accepting your new reality, even if it's less good than the one you had before.",
      "Do not judge me by my success, judge me by how many times I fell down and got back up again.",
      "A diamond is a chunk of coal that did well under pressure.",
      "Fall seven times, stand up eight.",
      "Resilience is the capacity to recover quickly from difficulties.",
      "Sometimes adversity is what you need to face in order to become successful.",
      "Strength grows in the moments when you think you can't go on but you keep going anyway.",
      "The human capacity for burden is like bamboo—far more flexible than you'd ever believe.",
      "The oak fought the wind and was broken, the willow bent when it must and survived.",
    ],
    mindset: [
      "Whether you think you can or you think you can’t, you’re right.",
      "Your mindset determines your success.",
      "Change your thoughts and you change your world.",
      "The mind is everything. What you think, you become.",
      "A positive mindset brings positive things.",
      "Success is a mindset. If you want success, start thinking of yourself as a success.",
      "Your beliefs become your thoughts, your thoughts become your words, your words become your actions.",
      "It’s not about the cards you’re dealt, but how you play the hand.",
      "Growth begins when we begin to accept our own weakness.",
      "You can’t have a positive life with a negative mind.",
      "A winner is just a loser who tried one more time.",
      "Once your mindset changes, everything on the outside will change along with it.",
      "Don’t adapt to the energy in the room. Influence the energy in the room.",
      "What consumes your mind controls your life.",
      "Mindset is what separates the best from the rest.",
    ],
    creativity: [
      "Creativity is intelligence having fun.",
      "You can’t use up creativity. The more you use, the more you have.",
      "Creativity takes courage.",
      "The chief enemy of creativity is ‘good’ sense.",
      "Creativity is seeing what others see and thinking what no one else ever thought.",
      "Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!",
      "To practice any art, no matter how well or badly, is a way to make your soul grow.",
      "Inspiration exists, but it has to find you working.",
      "Creativity doesn’t wait for that perfect moment. It fashions its own perfect moments out of ordinary ones.",
      "You can’t wait for inspiration. You have to go after it with a club.",
      "Don’t think outside the box. Think like there is no box.",
      "Creativity involves breaking out of expected patterns in order to look at things in a different way.",
      "Every artist was first an amateur.",
      "The worst enemy to creativity is self-doubt.",
      "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.",
    ],
    leadership: [
      "A leader is one who knows the way, goes the way, and shows the way.",
      "Leadership is not about being in charge. It is about taking care of those in your charge.",
      "The function of leadership is to produce more leaders, not more followers.",
      "The best way to lead people into the future is to connect with them deeply in the present.",
      "A genuine leader is not a searcher for consensus but a molder of consensus.",
      "Innovation distinguishes between a leader and a follower.",
      "Leadership is practiced not so much in words as in attitude and in actions.",
      "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",
      "Earn your leadership every day.",
      "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.",
      "Leadership is the capacity to translate vision into reality.",
      "The art of leadership is saying no, not yes. It is very easy to say yes.",
      "A good objective of leadership is to help those who are doing poorly to do well and to help those who are doing well to do even better.",
      "Leadership is unlocking people's potential to become better.",
      "You don’t need a title to be a leader.",
    ],
    "self-love": [
      "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
      "Talk to yourself like someone you love.",
      "How you love yourself is how you teach others to love you.",
      "To fall in love with yourself is the first secret to happiness.",
      "Loving yourself isn’t vanity. It’s sanity.",
      "Be proud of who you are, and not ashamed of how someone else sees you.",
      "The relationship with yourself sets the tone for every other relationship you have.",
      "You are enough just as you are.",
      "You carry so much love in your heart. Give some to yourself.",
      "Owning our story and loving ourselves through that process is the bravest thing we’ll ever do.",
      "Self-love is not selfish; you cannot truly love another until you know how to love yourself.",
      "You owe yourself the love that you so freely give to other people.",
      "Your value doesn’t decrease based on someone’s inability to see your worth.",
      "Make peace with your broken pieces.",
      "You were born to be real, not perfect.",
    ],
    hardwork: [
      "Success usually comes to those who are too busy to be looking for it.",
      "There is no substitute for hard work.",
      "Hard work beats talent when talent doesn’t work hard.",
      "Dreams don’t work unless you do.",
      "The only place where success comes before work is in the dictionary.",
      "Work hard in silence, let success be your noise.",
      "Don’t wish it were easier. Wish you were better.",
      "Strive for progress, not perfection.",
      "Push yourself because no one else is going to do it for you.",
      "The harder you work for something, the greater you’ll feel when you achieve it.",
      "Success is the sum of small efforts, repeated day in and day out.",
      "Hard work spotlights the character of people.",
      "Great things come from hard work and perseverance. No excuses.",
      "If people knew how hard I had to work to gain my mastery, it wouldn't seem so wonderful at all.",
      "Without hard work, nothing grows but weeds.",
    ],
  };

  useEffect(() => {
    const gradients = [
      "from-purple-700 via-indigo-700 to-blue-700",
      "from-pink-600 via-red-500 to-yellow-500",
      "from-green-400 via-emerald-600 to-teal-700",
      "from-indigo-800 via-purple-700 to-pink-600",
      "from-cyan-500 via-sky-600 to-blue-700",
    ];
    const random = gradients[Math.floor(Math.random() * gradients.length)];
    setRandomGradient(random);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const selected = allQuotes[topic.toLowerCase()];
      if (!selected) {
        toast.error("No quotes found for this topic.");
        setQuotes([]);
      } else {
        const shuffled = [...selected]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setQuotes(shuffled);
        toast.success(`Showing quotes for ${topic}`);
      }
      setLoading(false);
    }, 300);
  };

  const handleRandom = () => {
    const all = Object.values(allQuotes).flat();
    const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);
    setQuotes(shuffled);
    toast.success("Random quotes displayed");
  };

  //   const handleCopy = (quote: string) => {
  //     navigator.clipboard.writeText(quote);
  //     toast("Quote copied!");
  //   };

  //   const topics = Object.keys(allQuotes);

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${randomGradient} dark:from-black dark:to-gray-900 p-4 text-white relative`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${
          randomGradient || "from-gray-800 to-black"
        } opacity-30 dark:opacity-20 blur-2xl`}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-xl"
      >
        <header className="absolute top-6 left-6 text-white text-xl font-bold tracking-wide select-none">
          Nexium<span className="text-yellow-300">Quotes</span>
        </header>

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
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm">
          {[
            "success",
            "motivation",
            "focus",
            "resilience",
            "mindset",
            "creativity",
            "leadership",
            "self-love",
            "hardwork",
            "discipline",
          ].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all"
            >
              {t}
            </button>
          ))}
        </div>

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
              disabled={loading}
              className="pl-10 bg-white/30 placeholder-white text-white focus-visible:ring-white"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-indigo-700 hover:bg-indigo-100 w-full sm:w-auto"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </Button>

          <Button
            type="button"
            onClick={handleRandom}
            disabled={loading}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black flex items-center gap-1"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Random
              </>
            )}
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
                key={`${quote}-${idx}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
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
        </AnimatePresence>

        <footer className="mt-8 text-center text-sm text-white/70 dark:text-white/50">
          Built with ❤️ using{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-white"
          >
            Next.js
          </a>
          ,{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-white"
          >
            Tailwind CSS
          </a>{" "}
          &{" "}
          <a
            href="https://ui.shadcn.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-white"
          >
            ShadCN UI
          </a>{" "}
          by <span className="font-semibold text-white">Jamal Nadeem</span>{" "}
          🎮⚡🎯💫
        </footer>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, Search, Loader2, Copy, Check, Quote as QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export interface QuoteItem {
  id?: number | string;
  quote: string;
  author: string;
}

const FALLBACK_QUOTES: Record<string, QuoteItem[]> = {
  success: [
    { quote: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller" },
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { quote: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { quote: "I never dreamed about success, I worked for it.", author: "Estée Lauder" },
    { quote: "Success seems to be connected with action.", author: "Conrad Hilton" },
    { quote: "People who are successful decide they are going to be successful.", author: "John C. Maxwell" },
    { quote: "There is no elevator to success — you have to take the stairs.", author: "Zig Ziglar" },
    { quote: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou" },
    { quote: "Success isn’t always about greatness. It’s about consistency.", author: "Dwayne Johnson" },
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  ],
  motivation: [
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Les Brown" },
    { quote: "Great things never come from comfort zones.", author: "Neil Strauss" },
    { quote: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
    { quote: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { quote: "Dream bigger. Do bigger.", author: "Robin Sharma" },
    { quote: "Don’t stop when you’re tired. Stop when you’re done.", author: "Marilyn Monroe" },
    { quote: "Wake up with determination. Go to bed with satisfaction.", author: "George Horace Lorimer" },
    { quote: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { quote: "Little things make big days.", author: "Isabel Marant" },
    { quote: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { quote: "Don’t wait for opportunity. Create it.", author: "George Bernard Shaw" },
    { quote: "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
    { quote: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { quote: "Keep going. Everything you need will come to you at the perfect time.", author: "Unknown" },
    { quote: "Be stronger than your excuses.", author: "Unknown" },
  ],
  focus: [
    { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { quote: "You get what you focus on — so focus wisely.", author: "Tony Robbins" },
    { quote: "Where focus goes, energy flows.", author: "Tony Robbins" },
    { quote: "Stay focused and never give up.", author: "Unknown" },
    { quote: "Focus is the key to success.", author: "Bill Gates" },
    { quote: "Starve your distractions. Feed your focus.", author: "Daniel Goleman" },
    { quote: "Don’t dwell on what went wrong. Focus on what to do next.", author: "Denis Waitley" },
    { quote: "You can’t depend on your eyes when your imagination is out of focus.", author: "Mark Twain" },
    { quote: "Your life is controlled by what you focus on.", author: "Tony Robbins" },
    { quote: "Focus like a laser, not a flashlight.", author: "Michael Jordan" },
    { quote: "Focus is more important than intelligence.", author: "Unknown" },
    { quote: "What you focus on expands.", author: "T. Harv Eker" },
    { quote: "Concentrate all your thoughts upon the work in hand.", author: "Alexander Graham Bell" },
    { quote: "Keep your eyes on the stars and your feet on the ground.", author: "Theodore Roosevelt" },
    { quote: "Discipline is just choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  ],
  discipline: [
    { quote: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { quote: "We do today what they won’t, so tomorrow we accomplish what they can’t.", author: "Dwayne Johnson" },
    { quote: "The pain of discipline is far less than the pain of regret.", author: "Sarah Bombell" },
    { quote: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { quote: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", author: "Marie Forleo" },
    { quote: "Without self-discipline, success is impossible, period.", author: "Lou Holtz" },
    { quote: "Discipline turns ability into achievement.", author: "John Wooden" },
    { quote: "Self-control is strength. Right thought is mastery.", author: "James Allen" },
    { quote: "The first and best victory is to conquer self.", author: "Plato" },
    { quote: "Your level of success is determined by your level of discipline and perseverance.", author: "Unknown" },
    { quote: "Don’t count the days, make the days count — with discipline.", author: "Muhammad Ali" },
    { quote: "Discipline is the foundation of a successful and meaningful life.", author: "Unknown" },
    { quote: "You are what you do, not what you say you’ll do.", author: "Carl Jung" },
    { quote: "Discipline creates lifestyle; habits define your future.", author: "Unknown" },
    { quote: "The price of discipline is always less than the pain of regret.", author: "Nido Qubein" },
  ],
  resilience: [
    { quote: "Resilience is knowing that you are the only one that has the power to pick yourself up.", author: "Mary Holloway" },
    { quote: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { quote: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling" },
    { quote: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
    { quote: "You may have to fight a battle more than once to win it.", author: "Margaret Thatcher" },
    { quote: "Persistence and resilience only come from having been given the chance to work through difficult problems.", author: "Gever Tulley" },
    { quote: "Resilience is accepting your new reality, even if it's less good than the one you had before.", author: "Elizabeth Edwards" },
    { quote: "Do not judge me by my success, judge me by how many times I fell down and got back up again.", author: "Nelson Mandela" },
    { quote: "A diamond is a chunk of coal that did well under pressure.", author: "Henry Kissinger" },
    { quote: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { quote: "Resilience is the capacity to recover quickly from difficulties.", author: "Unknown" },
    { quote: "Sometimes adversity is what you need to face in order to become successful.", author: "Zig Ziglar" },
    { quote: "Strength grows in the moments when you think you can't go on but you keep going anyway.", author: "Unknown" },
    { quote: "The human capacity for burden is like bamboo—far more flexible than you'd ever believe.", author: "Jodi Picoult" },
    { quote: "The oak fought the wind and was broken, the willow bent when it must and survived.", author: "Robert Jordan" },
  ],
  mindset: [
    { quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { quote: "Your mindset determines your success.", author: "Carol Dweck" },
    { quote: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
    { quote: "The mind is everything. What you think, you become.", author: "Buddha" },
    { quote: "A positive mindset brings positive things.", author: "Philippa Perry" },
    { quote: "Success is a mindset. If you want success, start thinking of yourself as a success.", author: "Joyce Brothers" },
    { quote: "Your beliefs become your thoughts, your thoughts become your words, your words become your actions.", author: "Mahatma Gandhi" },
    { quote: "It’s not about the cards you’re dealt, but how you play the hand.", author: "Randy Pausch" },
    { quote: "Growth begins when we begin to accept our own weakness.", author: "Jean Vanier" },
    { quote: "You can’t have a positive life with a negative mind.", author: "Joyce Meyer" },
    { quote: "A winner is just a loser who tried one more time.", author: "George M. Moore Jr." },
    { quote: "Once your mindset changes, everything on the outside will change along with it.", author: "Steve Maraboli" },
    { quote: "Don’t adapt to the energy in the room. Influence the energy in the room.", author: "Unknown" },
    { quote: "What consumes your mind controls your life.", author: "Unknown" },
    { quote: "Mindset is what separates the best from the rest.", author: "Unknown" },
  ],
  creativity: [
    { quote: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { quote: "You can’t use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
    { quote: "Creativity takes courage.", author: "Henri Matisse" },
    { quote: "The chief enemy of creativity is ‘good’ sense.", author: "Pablo Picasso" },
    { quote: "Creativity is seeing what others see and thinking what no one else ever thought.", author: "Albert Szent-Györgyi" },
    { quote: "Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!", author: "Dr. Seuss" },
    { quote: "To practice any art, no matter how well or badly, is a way to make your soul grow.", author: "Kurt Vonnegut" },
    { quote: "Inspiration exists, but it has to find you working.", author: "Pablo Picasso" },
    { quote: "Creativity doesn’t wait for that perfect moment. It fashions its own perfect moments out of ordinary ones.", author: "Bruce Garrabrandt" },
    { quote: "You can’t wait for inspiration. You have to go after it with a club.", author: "Jack London" },
    { quote: "Don’t think outside the box. Think like there is no box.", author: "Unknown" },
    { quote: "Creativity involves breaking out of expected patterns in order to look at things in a different way.", author: "Edward de Bono" },
    { quote: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
    { quote: "The worst enemy to creativity is self-doubt.", author: "Sylvia Plath" },
    { quote: "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.", author: "Scott Adams" },
  ],
  leadership: [
    { quote: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
    { quote: "Leadership is not about being in charge. It is about taking care of those in your charge.", author: "Simon Sinek" },
    { quote: "The function of leadership is to produce more leaders, not more followers.", author: "Ralph Nader" },
    { quote: "The best way to lead people into the future is to connect with them deeply in the present.", author: "James Kouzes" },
    { quote: "A genuine leader is not a searcher for consensus but a molder of consensus.", author: "Martin Luther King Jr." },
    { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { quote: "Leadership is practiced not so much in words as in attitude and in actions.", author: "Harold S. Geneen" },
    { quote: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", author: "Ronald Reagan" },
    { quote: "Earn your leadership every day.", author: "Michael Jordan" },
    { quote: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.", author: "Jack Welch" },
    { quote: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis" },
    { quote: "The art of leadership is saying no, not yes. It is very easy to say yes.", author: "Tony Blair" },
    { quote: "A good objective of leadership is to help those who are doing poorly to do well and to help those who are doing well to do even better.", author: "Jim Rohn" },
    { quote: "Leadership is unlocking people's potential to become better.", author: "Bill Bradley" },
    { quote: "You don’t need a title to be a leader.", author: "Mark Sanborn" },
  ],
  "self-love": [
    { quote: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
    { quote: "Talk to yourself like someone you love.", author: "Brené Brown" },
    { quote: "How you love yourself is how you teach others to love you.", author: "Rupi Kaur" },
    { quote: "To fall in love with yourself is the first secret to happiness.", author: "Robert Morley" },
    { quote: "Loving yourself isn’t vanity. It’s sanity.", author: "Katrina Mayer" },
    { quote: "Be proud of who you are, and not ashamed of how someone else sees you.", author: "Unknown" },
    { quote: "The relationship with yourself sets the tone for every other relationship you have.", author: "Jane Fonda" },
    { quote: "You are enough just as you are.", author: "Meghan Markle" },
    { quote: "You carry so much love in your heart. Give some to yourself.", author: "R.Z." },
    { quote: "Owning our story and loving ourselves through that process is the bravest thing we’ll ever do.", author: "Brené Brown" },
    { quote: "Self-love is not selfish; you cannot truly love another until you know how to love yourself.", author: "Unknown" },
    { quote: "You owe yourself the love that you so freely give to other people.", author: "Unknown" },
    { quote: "Your value doesn’t decrease based on someone’s inability to see your worth.", author: "Ted Rubin" },
    { quote: "Make peace with your broken pieces.", author: "Unknown" },
    { quote: "You were born to be real, not perfect.", author: "Unknown" },
  ],
  hardwork: [
    { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { quote: "There is no substitute for hard work.", author: "Thomas Edison" },
    { quote: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
    { quote: "Dreams don’t work unless you do.", author: "John C. Maxwell" },
    { quote: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { quote: "Work hard in silence, let success be your noise.", author: "Frank Ocean" },
    { quote: "Don’t wish it were easier. Wish you were better.", author: "Jim Rohn" },
    { quote: "Strive for progress, not perfection.", author: "Unknown" },
    { quote: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
    { quote: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
    { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { quote: "Hard work spotlights the character of people.", author: "John Wooden" },
    { quote: "Great things come from hard work and perseverance. No excuses.", author: "Kobe Bryant" },
    { quote: "If people knew how hard I had to work to gain my mastery, it wouldn't seem so wonderful at all.", author: "Michelangelo" },
    { quote: "Without hard work, nothing grows but weeds.", author: "Gordon B. Hinckley" },
  ],
};

const SUGGESTED_TOPICS = [
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
];

export function QuoteForm() {
  const { setTheme, theme } = useTheme();

  const [randomGradient, setRandomGradient] = useState("");
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

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

  const fetchDynamicQuotes = useCallback(async (searchTopic?: string, isInitial: boolean = false) => {
    setLoading(true);
    const cleanTopic = (searchTopic !== undefined ? searchTopic : topic).trim().toLowerCase();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      let fetchedResults: QuoteItem[] = [];

      if (!cleanTopic) {
        // Fetch 3 fresh random quotes
        const response = await fetch("https://dummyjson.com/quotes/random/3", {
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API error (${response.status})`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          fetchedResults = data.map((item: { id?: number; quote: string; author: string }) => ({
            id: item.id || Math.random(),
            quote: item.quote,
            author: item.author || "Unknown",
          }));
        }
      } else {
        // Fetch from API and filter by topic
        const response = await fetch("https://dummyjson.com/quotes?limit=100", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API error (${response.status})`);
        }

        const data = await response.json();
        const apiList: QuoteItem[] = Array.isArray(data.quotes)
          ? data.quotes.map((q: { id?: number; quote: string; author: string }) => ({
              id: q.id,
              quote: q.quote,
              author: q.author || "Unknown",
            }))
          : [];

        const filtered = apiList.filter(
          (item) =>
            item.quote.toLowerCase().includes(cleanTopic) ||
            item.author.toLowerCase().includes(cleanTopic)
        );

        if (filtered.length > 0) {
          fetchedResults = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 3);
        } else {
          // If no keyword match in API pool, check local curated database
          const localList = FALLBACK_QUOTES[cleanTopic];
          if (localList && localList.length > 0) {
            fetchedResults = [...localList].sort(() => 0.5 - Math.random()).slice(0, 3);
            toast.info(`Showing curated quotes for "${cleanTopic}"`);
          } else {
            // General inspiration
            fetchedResults = [...apiList].sort(() => 0.5 - Math.random()).slice(0, 3);
            toast.info(`No exact API match for "${cleanTopic}". Showing inspired quotes.`);
          }
        }
      }

      if (fetchedResults.length > 0) {
        setQuotes(fetchedResults);
        if (!isInitial) {
          if (!cleanTopic) {
            toast.success("Random quotes loaded!");
          } else {
            toast.success(`Quotes updated for "${cleanTopic}"`);
          }
        }
      } else {
        throw new Error("No quotes returned");
      }
    } catch (err) {
      console.warn("API call failed, falling back to local dataset:", err);
      const fallbackList =
        cleanTopic && FALLBACK_QUOTES[cleanTopic]
          ? FALLBACK_QUOTES[cleanTopic]
          : Object.values(FALLBACK_QUOTES).flat();

      const shuffled = [...fallbackList].sort(() => 0.5 - Math.random()).slice(0, 3);
      setQuotes(shuffled);
      toast.info("Offline/fallback quotes loaded");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  // Initial load
  useEffect(() => {
    fetchDynamicQuotes("", true);
  }, [fetchDynamicQuotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDynamicQuotes(topic);
  };

  const handleSelectTopic = (selected: string) => {
    setTopic(selected);
    fetchDynamicQuotes(selected);
  };

  const handleRandom = () => {
    setTopic("");
    fetchDynamicQuotes("");
  };

  const handleCopy = (quoteText: string, author: string, idx: number) => {
    const fullText = `“${quoteText}” — ${author}`;
    navigator.clipboard.writeText(fullText);
    setCopiedIdx(idx);
    toast.success("Quote copied to clipboard!");
    setTimeout(() => {
      setCopiedIdx(null);
    }, 2000);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${randomGradient} dark:from-black dark:to-gray-900 p-4 text-white relative transition-colors duration-700`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${
          randomGradient || "from-gray-800 to-black"
        } opacity-30 dark:opacity-20 blur-2xl pointer-events-none`}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <header className="text-white text-xl font-bold tracking-wide select-none flex items-center gap-1.5">
            <QuoteIcon className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span>Nexium</span>
            <span className="text-yellow-300">Quotes</span>
          </header>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>

        <h1 className="text-white text-2xl sm:text-3xl font-extrabold text-center mb-2 tracking-tight">
          Motivational Quote Generator
        </h1>
        <p className="text-white/80 text-center mb-6 text-sm sm:text-base">
          Discover dynamic inspiring quotes powered by live API or explore categories.
        </p>

        {/* Quick Topic Pill Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs sm:text-sm">
          {SUGGESTED_TOPICS.map((t) => {
            const isActive = topic.toLowerCase() === t.toLowerCase();
            return (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTopic(t)}
                disabled={loading}
                className={`px-3 py-1 rounded-full border transition-all duration-200 capitalize ${
                  isActive
                    ? "bg-white text-indigo-900 border-white font-semibold shadow-md scale-105"
                    : "bg-white/10 border-white/30 text-white hover:bg-white/20 active:scale-95"
                } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Search & Action Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-white/60 w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Search topic or author (e.g. success, courage)..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              className="pl-10 bg-white/25 placeholder-white/70 text-white focus-visible:ring-white border-white/30 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold w-full sm:w-auto px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </Button>

          <Button
            type="button"
            onClick={handleRandom}
            disabled={loading}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-semibold flex items-center justify-center gap-1.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-black/20" /> Random
              </>
            )}
          </Button>
        </form>

        {/* Quotes Display & Skeleton Loading Grid */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {loading ? (
            /* Skeleton Placeholder Cards */
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg overflow-hidden animate-pulse flex flex-col justify-between min-h-[160px]"
              >
                <div className="space-y-2.5">
                  <div className="h-3.5 bg-white/30 rounded-md w-full" />
                  <div className="h-3.5 bg-white/20 rounded-md w-5/6" />
                  <div className="h-3.5 bg-white/15 rounded-md w-4/6" />
                </div>
                <div className="flex justify-between items-center mt-6 pt-3 border-t border-white/10">
                  <div className="h-3 bg-white/25 rounded w-1/2" />
                  <div className="h-6 w-12 bg-white/15 rounded-lg" />
                </div>
              </div>
            ))
          ) : (
            quotes.map((item, idx) => (
              <motion.div
                key={`${item.quote}-${idx}`}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                className="group relative p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl scale-150 group-hover:opacity-40 transition-all duration-500 z-0 pointer-events-none" />

                <p className="relative z-10 italic leading-relaxed text-balance text-sm sm:text-base mb-4 font-normal">
                  “{item.quote}”
                </p>

                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/15 text-xs text-white/80 gap-2">
                  <span className="font-semibold tracking-wide truncate max-w-[150px]" title={item.author || "Unknown"}>
                    <span className="text-yellow-300 font-bold mr-1">—</span>
                    {item.author || "Unknown"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.quote, item.author, idx)}
                    aria-label="Copy quote to clipboard"
                    className="p-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/25 text-white/90 hover:text-white transition-all active:scale-95 flex items-center gap-1 text-[11px] shrink-0"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-300" />
                        <span className="text-green-300 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs sm:text-sm text-white/70 dark:text-white/50">
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

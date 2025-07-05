// src/App.jsx
import { useState } from "react";
import { quotesData } from "./data/quotes";
import QuoteCard from "./components/QuoteCard";

function App() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState([]);

  const handleGenerate = () => {
    const key = topic.toLowerCase();
    if (quotesData[key]) {
      setQuotes(quotesData[key]);
    } else {
      setQuotes(["No quotes found for this topic. Try 'success', 'motivation', or 'coding'."]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1>🧠 Motivational Quote Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic (e.g. success)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />
      <button
        onClick={handleGenerate}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Generate Quotes
      </button>

      <div style={{ marginTop: "2rem" }}>
        {quotes.map((q, index) => (
          <QuoteCard key={index} text={q} />
        ))}
      </div>
    </div>
  );
}

export default App;

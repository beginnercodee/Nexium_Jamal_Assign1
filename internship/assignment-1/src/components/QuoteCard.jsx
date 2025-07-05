// src/components/QuoteCard.jsx

function QuoteCard({ text }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      {text}
    </div>
  );
}

export default QuoteCard;

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>🚀 Hello, Jamal!</h1>
      <p>You've clicked the button {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

export default App;
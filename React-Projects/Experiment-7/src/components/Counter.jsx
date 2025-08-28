import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <div className="count">{count}</div>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>
    </div>
  );
}

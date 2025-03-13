import React, { useState } from "react";
export default function Home() {
  const [niche, setNiche] = useState("");
  const [budget, setBudget] = useState("");
  const [ideas, setIdeas] = useState([]);
  const fetchIdeas = async () => {
    const response = await fetch("/api/generate-ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche, budget }),
    });
    const data = await response.json();
    setIdeas(data.ideas);
  };
  return (
    <div>
      <h1>AI Business Idea Finder</h1>
      <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Enter niche" />
      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter budget" />
      <button onClick={fetchIdeas}>Find Ideas</button>
      <ul>{ideas.map((idea, index) => (<li key={index}>{idea}</li>))}</ul>
    </div>
  );
}

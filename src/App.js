import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("Cache Returned", input);
      setResults(cache[input]);
      return;
    }

    console.log("API CALL:", input);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);

    return () => {
      clearInterval(timer);
    };
  }, [input]);

  return (
    <div className="over">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          name=""
          id=""
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="results-container">
            {results.map((r) => (
              <span className="results" key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

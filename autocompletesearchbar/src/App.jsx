import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache]=useState({})

  const fetchData = async () => {
    if(cache[input]){
      console.log("Cache result", input)
      setResults(cache[input]);
      return;
    }
    const res = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const data = await res.json();
    setResults(data?.recipes);
    setCache((prev)=>({...prev, [input]:data?.recipes}))
  };

  useEffect(() => {
    const timer=setTimeout(fetchData,300)
    return ()=>{
      clearTimeout(timer)
    }
  }, [input]);


  return (
    <div className="App">
      <h1>AutoComplete Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={()=>setShowResults(true)}
          onBlur={()=>setShowResults(false)}
        />
        {showResults && (
          <div className="results-container">
            {results.map((r) => (
              <span className="result" key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

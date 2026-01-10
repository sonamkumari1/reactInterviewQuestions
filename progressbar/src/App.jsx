import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {

  const [animatesProgress, setAnimatedProgress]=useState(0)

  useEffect(()=>{
    setTimeout(()=>setAnimatedProgress(progress),100)
  },[progress])
  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          width: `${animatesProgress}%`,
          // transform: `translateX(${animatesProgress-100}%)`,
          color: animatesProgress < 5 ? "black" : "white",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax="100"
        aria-valuemin="0"
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  const bars = [1, 5, 10, 20, 30, 50, 77, 90];
  return (
    <div className="App">
      <h1>progress Bar</h1>
      {bars.map((value) => (
        <ProgressBar key={value} progress={value} />
      ))}
    </div>
  );
}

export default App;

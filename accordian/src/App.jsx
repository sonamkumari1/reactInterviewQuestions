import React from "react";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const items = [
  {
    title: "JavaScripts Basics",
    content: "Learn Vriables, functions, and loops in JavaScript.",
  },
  {
    title: "Recat.js Overview",
    content: "Understand components, state, and props in React",
  },
  {
    title: "Node.js",
    content: "Basic of server-side development with Node.js",
  },
  {
    title: "Full-Stack development",
    content: "Build full-stack apps with React and Node.js",
  },
];
function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex == index ? null : index);
  };
  return !items || (items.length === 0)? "No items available": (
    <div className="accordion">
      {items.map((item, index) => {
        return (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {openIndex === index ? <FaChevronUp className="right" /> : <FaChevronDown className="right"  />}
            </button>
            {openIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;

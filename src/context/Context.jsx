import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  function formatResponse(text) {
    return text
      .replace(/---/g, "<hr>")
      .replace(/### (.*)/g, "<h2>$1</h2>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\d+\.\s(.*)/g, "<li>$1</li>")
      .replace(/\n\*\s(.*)/g, "<li>$1</li>")
      .replace(/\n/g, "<br>");
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      response = await runChat(input);
      setRecentPrompt(input);
    }

    let newResponse = formatResponse(response);
    setRecentPrompt(input);
    setResultData(newResponse);
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

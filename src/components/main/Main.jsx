import React, { useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    setRecentPrompt,
    resultData,
    input,
    setInput,
    setPrevPrompt,
  } = useContext(Context);

  let card1 = "Suggest the trending skills in market";
  let card2 = "Most playing sports in the world";
  let card3 = "Top 5 most popular programming language";
  let card4 = "Comprehensive discussion on education structure in India";

  const onRequest = async (prompt) => {
    setInput(prompt);
    setPrevPrompt((prev) => [...prev]);
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="main">
      <div className="nav">
        <button onClick={reload}>Echo AI</button>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Namaste</span>
              </p>
              <p>How can I assist you?</p>
            </div>
            <div className="cards">
              <div
                onClick={() => {
                  onRequest(card1);
                }}
                className="card"
              >
                <p>{card1}</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  onRequest(card2);
                }}
                className="card"
              >
                <p>{card2}</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  onRequest(card3);
                }}
                className="card"
              >
                <p>{card3} </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  onRequest(card4);
                }}
                className="card"
              >
                <p>{card4}</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  {" "}
                  <hr />
                  <hr />
                  <hr />{" "}
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the "
            />
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img
              onClick={() => {
                onSent();
              }}
              src={assets.send_icon}
              alt=""
            />
          </div>
          <p className="bottom-info">
            This AI-powered assistant may generate inaccurate or misleading
            information.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;

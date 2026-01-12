import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, setShowResult } =
    useContext(Context);
  const onLoad = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={reload} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New chart</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((el, idx) => {
              return (
                <div
                  onClick={() => {
                    onLoad(el);
                  }}
                  className="recent-entry"
                  key={idx}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{el.slice(0, 10)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

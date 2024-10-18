/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const GoToTop = () => {
  const [showGoTop, setShowGoTop] = useState(false);
  const [animateArrow, setAnimateArrow] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.scrollY > 50 || window.pageYOffset > 50);
    setAnimateArrow(true);
  };
  const handleScrollUp = () => {
    window.scrollTo({ right: 0, top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    const animationInterval = setInterval(() => {
      setAnimateArrow(!animateArrow); // Toggle animation state every two seconds
    }, 3000);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);
  return (
    <div className={showGoTop === false && 'hidden'}>
      <img
        src={assets.up_arrow}
        alt=""
        className={`w-10 cursor-pointer dark:bg-white hover:scale-110 ${
          animateArrow ? "animate-pulse" : ""
        }`}
        onClick={handleScrollUp}
        title="Go to top"
      />
    </div>
  );
};

export default GoToTop;

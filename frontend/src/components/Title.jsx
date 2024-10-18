/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Title = ({ text1, text2 }) => {
  // We will display the text
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 uppercase text-3xl dark_head">
        {text1}{" "}
        <span className="text-gray-700 font-medium uppercase text-3xl dark_main">
          {text2}
        </span>{" "}
      </p>
      <p className="w-11 bg-[#414141] h-[2px] dark_hr"></p>
    </div>
  );
};

export default Title;

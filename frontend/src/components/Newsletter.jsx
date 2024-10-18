/* eslint-disable no-unused-vars */
import React from "react";

const Newsletter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl sm:text-3xl font-medium text-gray-800 dark_head">
        <span className="dark_main">Subscribe</span> Now & get <span className="dark_main">20%</span> off
      </p>
      <p className="text-md text-gray-500 mt-3 dark_text">
        Stay ahead of the trends—subscribe to our newsletter for exclusive
        fashion updates, offers, and style tips!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center mx-auto gap-3 my-6 border pl-3"
      >
        <input
          type="email"
          name=""
          id=""
          className="w-full sm:flex-1 outline-none dark_input"
          placeholder="Your Email Id."
        />
        <button className="text-white bg-black px-10 py-4 dark_button tracking-wide">Subscribe</button>
      </form>
    </div>
  );
};

export default Newsletter;

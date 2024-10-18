/* eslint-disable no-unused-vars */
import React from "react";
import { conditions } from "../assets/assets"; // Assuming conditions is an array of objects

const Conditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center tracking-wider dark_head">
        Terms and Conditions
      </h1>
      <hr className="h-[2px] bg-gray-400 my-10" />

      {conditions.map((condition, index) => (
        <div key={index} className="mb-10 w-full sm:max-w-[80%]">
          <h2 className="text-2xl font-semibold py-4 dark_head">
            {condition.title}
          </h2>
          {condition.description && (
            <p className="text-gray-700 dark_text">{condition.description}</p>
          )}
          {condition.items && (
            <ul className="list-disc pl-4 text-gray-700 flex flex-col gap-4">
              {condition.items.map((item, index) => (
                <li key={index} className="dark_text">
                  <span className="font-semibold dark_head">{item.title}:</span>{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Conditions;

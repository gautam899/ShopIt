/* eslint-disable no-unused-vars */
import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Newsletter from "../components/Newsletter";
const Contact = () => {
  return (
    <div className="border-t">
      <div className="mt-10 text-center mb-10">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-20 mb-28">
        {/* The image */}
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-lg text-gray-800 font-medium dark_head">
            Our Store
          </p>
          <p className="text-gray-600 dark_text">
            54709 Willms Station Suite 350, Washington, USA
          </p>
          <div className="text-gray-600 dark_text">
            <p>
              <span className="dark_head">Tel: </span> (415) 555‑0132
            </p>
            <p>
              <span className="dark_head">Email: </span>
              greatstackdev@gmail.com
            </p>
          </div>
          <div className="flex flex-col gap-1 dark_text">
            <p className="text-lg text-gray-800 font-medium dark_head">
              {" "}
              Careers at Forever
            </p>
            <p className="text-gray-600 dark_text">
              Learn more about our teams and job openings.
            </p>
          </div>
          <button className="border border-black px-6 py-2 active:bg-gray-300 dark_button">
            Explore Jobs
          </button>
        </div>
      </div>
      {/* NewLetter */}
      <Newsletter />
    </div>
  );
};

export default Contact;

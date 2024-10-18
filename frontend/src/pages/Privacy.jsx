/* eslint-disable no-unused-vars */
import { privacy_policy } from "../assets/assets";
const Privacy = () => {
  return (
    <div className="w-full sm:max-w-[70%] mt-10">
      <h1 className="text-2xl sm:text-4xl pb-4 font-bold dark_head text-center">ShopIt Privacy Notice</h1>
      <p className="dark_text">
        <span className="font-bold text-black dark_head ">Disclaimer: </span>
        In the event of any discrepancy or conflict, the English version will
        prevail over the translation.{" "}
      </p>
      <hr className="h-[2px] my-10 bg-gray-400 dark_hr" />
      {/* All the privacy policies */}
      <div className="flex flex-col gap-3">
        {privacy_policy.map((privacy, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold dark_head py-2">{privacy.title}</h2>
            <p className="text-gray-800 dark_text">{privacy.description}</p>
            {privacy.items && (
              <div className="mt-3 flex flex-col gap-3 p-2">
                {privacy.items.map((item, index) => (
                  <div key={index} className="gap-2 text-sm">
                    {item.title && <p className="font-bold dark_head py-1">{item.title}:</p>}
                    <p className="text-gray-800 dark_text">{item.description}</p>
                  </div>
                ))}
                <hr className="h-[2px] bg-gray-600 my-5 dark_hr" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;

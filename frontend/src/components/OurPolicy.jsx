/* eslint-disable no-unused-vars */
import { assets } from "../assets/assets";
const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around sm:flex-row gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} alt="exchange"  className="w-11 m-auto mb-5"/>
        <p className="font-semibold dark_head">Easy Exchange Policy</p>
        <p className="text-sm text-gray-600 dark_text">We offer hassel free exchange</p>
      </div>
      <div>
        <img src={assets.quality_icon} alt="exchange"  className="w-11 m-auto mb-5"/>
        <p className="font-semibold dark_head">Easy Exchange Policy</p>
        <p className="text-sm text-gray-600 dark_text">We offer hassel free exchange</p>
      </div>
      <div>
        <img src={assets.support_img} alt="exchange"  className="w-11 m-auto mb-5"/>
        <p className="font-semibold dark_head">Easy Exchange Policy</p>
        <p className="text-sm text-gray-600 dark_text">We offer hassel free exchange</p>
      </div>
    </div>
  );
};

export default OurPolicy;

import { assets } from "../assets/assets";

const Hero = () => {
  // This hero com
  return (
    <div className="flex flex-col sm:flex-row border-solid border-2 border-gray-400 ">
      {/* Left side of the hero section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center py-10 sm:py-0 ">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="h-[2px] w-8 md:w-11 bg-[#414141] dark_hr"></p>
            <p className="uppercase font-medium md:text-base dark_head">
              Our Bestsellers
            </p>
          </div>

          <h1 className="prata-regular text-3xl sm:text-5xl font-serif sm:py-3 font-bold dark_main">
            Latest Arrival
          </h1>

          <div className="flex items-center gap-2">
            <p className="uppercase md:text-base text-start font-bold dark_head">
              Shop Now
            </p>
            <p className="h-[1px] w-8 md:w-11 bg-[#414141] dark_hr"></p>
          </div>
        </div>
      </div>
      <img
        src={assets.home_display}
        alt=""
        className="w-1/2 max-sm:w-full object-contain "
      />
    </div>
  );
};

export default Hero;

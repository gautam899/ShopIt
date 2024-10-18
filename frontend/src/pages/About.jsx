/* eslint-disable react/no-unescaped-entities */
import { assets } from "../assets/assets";
import Newsletter from "../components/Newsletter";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="border-t">
      <div className="py-8 text-center">
        <Title text1={"About"} text2={"Us"} />
      </div>
      {/* about us */}
      <div className="flex flex-col lg:flex-row gap-16 my-10">
        <img src={assets.about_img} alt="" className="max-w-[480px]" />
        <div className="flex flex-col gap-6 text-[30px] tracking-wide justify-center mg:w-2/4 text-gray-500">
          <p className="text-sm dark_text">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.{" "}
          </p>
          <p className="text-sm dark_text">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-black dark_head">Our <span className="dark_main">mission</span></b>
          <p className="text-sm dark_text">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why choose Us */}
      <div className="py-3 text-xl">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col sm:flex-row max-sm:gap-3 mb-20">
        <div className="flex flex-col text-center gap-5 px-10 sm:px-15 py-12 sm:py-20 border border-gray-500 rounded ">
          <p className="text-black font-bold dark_head">Quality Assurance:</p>
          <p className="text-sm text-gray-400 dark_text">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="flex flex-col text-center gap-5 px-10 sm:px-15 py-12 sm:py-20 border border-gray-500 rounded">
          <p className="text-black font-bold dark_head">Convinience</p>
          <p className="text-sm text-gray-400 dark_text">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="flex flex-col text-center gap-5 px-10 sm:px-15 py-12 sm:py-20 border border-gray-500 rounded">
          <p className="text-black font-bold dark_head">Exceptional Customer Service:</p>
          <p className="text-sm text-gray-400 dark_text">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* NewLetter */}
      <Newsletter />
    </div>
  );
};

export default About;

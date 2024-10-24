/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [image, setImage] = useState(false);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const { setToken, backend_url, navigate } = useContext(ShopContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      try {
        const res = await axios.post(
          `${backend_url}/api/user/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(res);
        if (res.status === 200) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          toast.success("Login Successfull");
          navigate("/");
        } else {
          if (
            res.data &&
            res.data.message === "Please Verify your Email First"
          ) {
            toast.warning(
              "Your account is not verified. Please check your email and verify to proceed."
            );
          } else {
            console.log(res.message);
            toast.error("Something went wrong. Try again later.");
          }
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    } else if (currentState === "SignUp") {
      try {
        const formData = new FormData();
        formData.append("name", name);
        image && formData.append("image", image); // Append File object if exists

        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", gender);

        const res = await axios.post(
          `${backend_url}/api/user/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 200) {
          // setToken(res.data.token);
          // localStorage.setItem("token", res.data.token);
          toast.success(
            "Verification email sent! Please check your inbox and verify your account before logging in."
          );
          navigate("/login");
        } else {
          console.log(res.data);
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "User already Exist"
        ) {
          toast.error("User already exists");
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:mt-10">
      <img
        src={assets.login_display}
        alt=""
        className="sm:w-[50%] object-contain h-[500px]"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full sm:w-[50%] p-4 gap-4 "
      >
        <div className="text-2xl mt-2 font-serif flex gap-2">
          <p className="font-serif font-medium font-2xl dark_head">
            {currentState}
          </p>
          <hr className="h-[2px] bg-black w-11 my-auto" />
        </div>
        {currentState === "SignUp" ? (
          <div className="flex flex-col gap-3 w-full">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-900 outline-none dark_input"
              required
            />
            <label
              htmlFor="image"
              className="border border-gray-800 p-1 flex flex-row gap-2 cursor-pointer"
            >
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
              <img
                src={image ? URL.createObjectURL(image) : assets.default_user}
                className="w-9 cursor-pointer"
                alt="image"
              />
              <p className="text-sm text-gray-700 flex items-center">
                Upload Image (optional)
              </p>
            </label>
            <select
              name="gender"
              value={gender}
              id=""
              className="border border-gray-900 px-1 py-2.5 outline-none"
              onChange={(e) => setGender(e.target.value)}
              required
              autoFocus
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
          required
        />
        <div className="flex justify-center border dark_input border-gray-900 items-center w-full">
          <input
            id="password"
            type={type}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-none  outline-none dark_input"
            required
          />
          <span className="cursor-pointer px-2 " onClick={handleToggle}>
            {type === "password" ? (
              <img
                src={assets.eye_close}
                alt=""
                className="w-5 password-icon"
              />
            ) : (
              <img src={assets.eye_open} alt="" className="w-5 password-icon" />
            )}
          </span>
        </div>
        <button className="py-2 bg-[#39ac73] text-center w-full text-white text-xl font-medium tracking-wide">
          {currentState === "Login" ? "Login" : "SignUp"}
        </button>
        {currentState === "SignUp" && (
          <span className="flex gap-2 w-full items-center">
            <input type="checkbox" required className="" />
            <p className="dark_head">
              Agree to our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </span>
        )}

        {currentState === "Login" ? (
          <div className="flex justify-between w-full dark_head">
            <Link
              to="/forgot-password"
              className="hover:text-red-600 hover:underline"
            >
              <p>Forgot Password?</p>
            </Link>
            <Link
              onClick={() => setCurrentState("SignUp")}
              className="hover:text-green-500 hover:underline"
            >
              <p>Create Account</p>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end w-full text-blue-900 tracking-widest dark_head">
            <Link
              to="/login"
              onClick={() => setCurrentState("Login")}
              className="hover:underline hover:text-green-300"
            >
              <p>Login</p>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

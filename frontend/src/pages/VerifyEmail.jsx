/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { backend_url, setToken, navigate } = useContext(ShopContext);
  const [status, setStatus] = useState(false);
  const verifyEmail = async () => {
    const val = window.location.pathname.split("/");
    const userId = val[1];
    const verificationToken = val[3];
    if (!userId || !verificationToken) {
      toast.error("Invalid user ID or verification token");
      return;
    }
    try {
      const res = await axios.get(
        `${backend_url}/api/user/${userId}/verify-email/${verificationToken}`
      );
      console.log(res.data);
      if (res.status === 200) {
        setToken(res.data.token);
        setStatus(true);
        localStorage.setItem("token", res.data.token);
        toast.success("SignUp Successfull!!");
        navigate("/login");
      } else {
        toast.error("Something Went Wrong. Try again later.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //Call this function whenever we hit this route or the component mounts
  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div>
      {status === false ? (
        <h1>Verifying Email. Wait ......</h1>
      ) : (
        <h1>Email Verified Successfully</h1>
      )}
    </div>
  );
};

export default VerifyEmail;

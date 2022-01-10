import axios from "axios";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const handleVerify = async (otp, state, router) => {
  if (!otp) {
    toast.error("Invalid otp");
    return;
  }
  try {
    const hash = await bcrypt.hash(state?.password, 10);
    const rsp = await axios.post("/api/signup", {
      name: state?.name,
      email: state?.email,
      password: hash,
      otp,
    });
    if (rsp.data.data === "Already Exists") {
      toast.error("User Already Exists");
      router.replace("/login");
      return;
    }
    if (rsp.data.data === "Incorrect OTP") {
      toast.error("Incorrect OTP");
      return;
    }
  } catch (error) {
    toast.error("An error occurred");
    console.log(error);
    return;
  }

  router.replace("/login");
};

export default handleVerify;

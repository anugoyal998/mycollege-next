import axios from "axios";
import bcrypt from "bcryptjs";
import splitOtpDate from "../utils/splitOtpDate";
import toast from 'react-hot-toast'

const handleVerify = async (setLoading,otp,state,router)=> {
    setLoading((prev) => true);
    if (!otp || !state?.otp) {
      toast.error("Invalid otp");
      return;
    }
    const split = splitOtpDate(state?.otp)
    if(split?.date + 10*60*1000 < Date.now()) {
      toast.error("Session Timeout");
      router.reload()
      return;
    }
    const isMatch = await bcrypt.compare(otp, split?.otp);
    if (!isMatch) {
      toast.error("Incorrect otp");
      console.log("incorrect");
      return;
    }
    try {
      const hash = await bcrypt.hash(state?.password, 10);
      const rsp = await axios.post("/api/signup", {
        name: state?.name,
        email: state?.email,
        password: hash,
      });
      if (rsp.data.data === "Already Exists") {
        toast.error("User Already Exists");
        router.replace("/login");
        return;
      }
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
      return;
    }
    setLoading((prev) => false);
    router.replace("/login");   
}

export default handleVerify
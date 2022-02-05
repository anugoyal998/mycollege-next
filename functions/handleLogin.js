import toast from "react-hot-toast";
import validator from "validator";
import { sendOtp, verifyOtp } from "../http";

export const handleSignIn = async (email, router, auth, setAuth) => {
  if (!validator.isEmail(email) || email.split("@")[1] !== "nitkkr.ac.in") {
    toast.error("Login using your nit kkr domain");
    return;
  }
  try {
    const { data } = await sendOtp({ email });
    console.log(data);
    setAuth({ ...auth, otp: { email: data.email, hash: data.hash } });
    router.push('/login/verifyOtp')
  } catch (error) {
    console.log(error);
    toast.error("An error occurred");
    return;
  }
};

export const handleOtp = async (otp,hash,email,router,auth,setAuth)=> {
    if(!otp || !hash || !email){
        toast.error("Invalid OTP")
        return
    }
    try {
        const { data } = await verifyOtp({ otp, email, hash });
        console.log(data);
        setAuth({...auth, user: data.user, isAuth: data.user ? true : false})
        router.push('/')
    } catch (error) {
        console.log(error);
        toast.error("An error occurred");
        return;
    }
}
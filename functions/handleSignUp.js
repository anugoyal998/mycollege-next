import validator from 'validator';
import axios from 'axios';
import passwordValidator from '../utils/passwordValidator'
import toast from 'react-hot-toast'

const handleSignUp = async (state,setState,setHasSentOTP)=> {
    //check for all fields
    if (!(state && state?.name && state?.email && state?.password && state?.confirmPassword)) {
        toast.error('All fields are required')
        return false
    }
    //check if password and confirmPassword equals or not
    if (state.password !== state.confirmPassword) {
        toast.error('Password and Confirm Password not matched')
        return false
    }
    //isEmail?
    if (!validator.isEmail(state.email)) {
        toast.error('Invalid email')
        return false
    }
    const extName = state.email.split('@')[1]
    if(extName !== "nitkkr.ac.in"){
        toast.error("Email must be NIT KKR's domain")
        return false;
    }
    //validate password
    if (!passwordValidator(state.password)) {
        toast.error('Invalid password')
        return false
    }
    //send verification email
    try {
        const res = await axios.post(`/api/signup/nodemailer`, { email: state.email })
        setState({ ...state, otp: res.data.data })
    } catch (error) {
        toast.error('An error occured')
        return false
    }
    setHasSentOTP(true)
    return true
}

export default handleSignUp
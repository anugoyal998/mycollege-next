import axios from "axios";
import { setCookies } from 'cookies-next';
import toast from 'react-hot-toast'

const handleSignIn = async (state,router) => {
    if(!(state?.email && state?.password)){
        toast.error('All fields are required')
        return false
    }
    try {
        const rsp = await axios.post('/api/login',state)
        if(rsp?.data?.data === "No User Found"){
            router.push('/signup')
            return false
        }
        if(rsp?.data?.data === "Incorrect Password"){
            toast.error("Incorrect password")
            return false
        }
        setCookies("access_token",rsp?.data?.data?.access_token,{maxAge: 3600})
        setCookies("refresh_token",rsp?.data?.data?.refresh_token,{maxAge: 24*3600})
        router.push('/')
    } catch (error) {
        console.log(error)
        toast.error("An error occurred")
        return false
    }
    return true
};

export default handleSignIn
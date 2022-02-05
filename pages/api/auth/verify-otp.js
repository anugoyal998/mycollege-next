import otpService from '../../../backend/services/otp-service'
import userService from '../../../backend/services/user-service'
import tokenService from '../../../backend/services/token-service'
import UserDto from '../../../backend/dtos/user-dto'
import dbConnect from '../../../utils/dbConnect'
import Cookies from 'cookies'

dbConnect()

export default async function handle(req, res){
    try {
        // basic checks
        const { otp, hash, email } = req.body
        if (!otp || !hash || !email) {
            return res.status(400).json({ msg: "error" });
        }
        // split hash
        const [hashedOtp, expires] = hash.split(".");
        // check expiry time
        if (Date.now() > +expires) {
            return res.status(400).json({ msg: "Session Timeout" });
        }
        // rehash data
        const data = `${email}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data)
        if(!isValid) {
            return res.status(400).json({ msg: "Invalid Otp" });
        }
        // find user in db
        let user;
        user = await userService.findUser({email: email})
        // if user is not found --> create new user
        if(!user){
            user = await userService.createUser({email: email})
        }
        // generate tokens
        const  {accessToken, refreshToken} = tokenService.generateTokens({_id: user._id, email: email})
        // save tokens in db
        await tokenService.storeRefreshToken(refreshToken,user._id)
        // set cookies
        // Create a cookies instance
        const cookies = new Cookies(req, res)
        cookies.set('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
        cookies.set('accessToken',accessToken,{maxAge: 1000*60*60, httpOnly: true})
        const userDto = new UserDto(user)
        res.status(200).json({user: userDto, auth: true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'err'})
    }
}
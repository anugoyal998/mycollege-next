import dbConnect from '../../utils/dbConnect'
import Cookies from 'cookies'
import tokenService from '../../backend/services/token-service'
import userService from '../../backend/services/user-service'
import UserDto from '../../backend/dtos/user-dto'
dbConnect()

export default async function handle(req, res){
    try {
        // Create a cookies instance
        const cookies = new Cookies(req, res)
        const refreshTokenFromCookie = cookies.get('refreshToken')
        // verify refresh token
        const userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        const token = await tokenService.findRefreshToken(userData._id,refreshTokenFromCookie)
        if(!token) {
            return res.status(400).json({ msg: "error" });  
        }
        // get user
        const user = await userService.findUser({_id: userData._id})
        if(!user){
            return res.status(400).json({ msg: "error" })
        }
        // generate tokens
        const {refreshToken,accessToken} = tokenService.generateTokens({_id: userData._id, email: userData.email})
        await tokenService.updateRefreshToken(userData._id,refreshToken)
        // set cookies
        cookies.set('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
        cookies.set('accessToken',accessToken,{maxAge: 1000*60*60, httpOnly: true})
        const userDto = new UserDto(user)
        res.status(200).json({user: userDto, auth: true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'error'})
    }
}
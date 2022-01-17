import dbConnect from '../../../utils/dbConnect'
import UserSch from '../../../models/user'
import RefreshTokenSch from '../../../models/refreshToken'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
dbConnect()

const handler = async (req,res)=> {
    var user;
    try {
        const findData = await UserSch.find({email: req.body.email})
        if(findData.length <= 0){
            res.status(200).json({data: "No User Found"})
            return
        }
        user = findData[0];
        const isMatch = await bcrypt.compare(req.body.password, user?.password)
        if(!isMatch) {
            res.status(200).json({data: "Incorrect Password"})
            return
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({data: false})
    }
    const data = {name: user?.name, email: user?.email}
    const access_token = jwt.sign(data,process.env.JWT_ACCESS_SECRET,{expiresIn: '1h'})
    const refresh_token = jwt.sign(data,process.env.JWT_REFRESH_SECRET,{expiresIn: '24h'})
    try {
        const tokenData = new RefreshTokenSch({refresh_token})
        await tokenData.save()
    } catch (error) {
        console.log(error)
        res.status(400).json({data: false})
    }
    res.status(200).json({data: {access_token,refresh_token}})
}

export default handler
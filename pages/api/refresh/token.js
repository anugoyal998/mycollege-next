import RefreshTokenSch from '../../../models/refreshToken'
import dbConnect from '../../../utils/dbConnect'
import jwt from 'jsonwebtoken'
dbConnect()

export default async function handler(req, res) {
    try {
        const findToken = await RefreshTokenSch.find({refresh_token: req.body.refresh_token})
        if(findToken.length <= 0) {
            return res.status(400).json({data: false})    
        }
        var user;
        jwt.verify(req.body.refresh_token,process.env.JWT_REFRESH_SECRET,(err,info) => {
            if(err){
                console.log(err)
                res.status(400).json({data: false})
            }
            user = {name: info?.name,email: info?.email}
        })
        const access_token = jwt.sign(user,process.env.JWT_ACCESS_SECRET,{expiresIn: '1h'})
        res.status(200).json({data: {access_token}})
    } catch (error) {
        console.log(error)
        res.status(400).json({data: false})
    }
}
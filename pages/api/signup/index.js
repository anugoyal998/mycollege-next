import dbConnect from '../../../utils/dbConnect'
import UserSch from '../../../models/user'
import bcrypt from 'bcryptjs'
import TempOtpSch from '../../../models/tempOtp'
dbConnect()

export default async function handler(req,res){
    try{
        const {name,email,password,otp} = req.body;
        if(!name || !email || !password || !otp){
            res.status(400).json({data: false})
            return;
        }
        // find otp in db
        const findOtp = await TempOtpSch.find({email})
        if(findOtp.length <=0 ){
            res.status(400).json({success: false})
            return
        }
        // match otp
        const isMatch = await bcrypt.compare(otp,findOtp[findOtp.length-1]?.hash)
        if(!isMatch){
            res.status(201).json({data: "Incorrect OTP"})
            return;
        }
        //check if user already exist or not
        var findData = await UserSch.find({email: req.body.email})
        if(findData.length > 0){
            res.status(201).json({data: 'Already Exists'})
            return
        }
        //save user to db
        const data = new UserSch({
            name, email, password
        })
        await data.save()
        res.status(200).json({data: 'signup success'})
    }catch(error){
        res.status(400).json({success: false})
    }
}
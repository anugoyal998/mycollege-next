const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
const {generateOTP} = require('../../../utils/generateOTP')
const TempOtpSch = require('../../../models/tempOtp')

//initalize nodemailer client
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_SENDER_ID,
        pass: process.env.NODEMAILER_SENDER_ID_PASSWORD
    }
})

export default async function handler(req,res){
    const {email} = req.body
    if(!email){
        res.status(400).json({success:false})
    }
    //generate otp
    const otp = generateOTP()
    //hash otp
    const hash = await bcrypt.hash(otp,10)
    const hashedOTP = hash
    //set mail options
    const mailOptions = {
        from: process.env.NODEMAILER_SENDER_ID,
        to: req.body.email,
        text: `Your otp for MyCollege verification is ${otp}. Valid for 10 minutes`
    }  
    //send mail
    try {
        const rsp = await transport.sendMail(mailOptions)
        // console.log(rsp)
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false})
        return
    }
    try {
        // add hashedOTP to db
        const data = new TempOtpSch({email, hash: hashedOTP})
        await data.save()
        res.status(200).json({data: "success"})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false})
        return
    }
}
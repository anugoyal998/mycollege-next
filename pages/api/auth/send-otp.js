import hashService from '../../../backend/services/hash-service'
import otpService from '../../../backend/services/otp-service'
import dbConnect from '../../../utils/dbConnect'
dbConnect()

export default async function handler(req, res){
    try {
        const {email} = req.body
        if(!email){
            return res.status(400).json({msg: 'error'})    
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 10; // 10 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        await otpService.sendByEmail(email,otp)
        res.status(200).json({ hash: `${hash}.${expires}`, email });
        // res.status(200).json({ hash: `${hash}.${expires}`, email, otp });
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'error'})
    }
}
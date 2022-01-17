import jwt from 'jsonwebtoken'
import { authenticateToken } from '../../../utils/authenticateToken'
import dbConnect from '../../../utils/dbConnect'
dbConnect()

const handler = async (req,res) => {
    console.log(req.user)
    res.status(200).json({data: req.user})
}

export default authenticateToken(handler)
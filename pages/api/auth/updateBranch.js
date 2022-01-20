import dbConnect from "../../../utils/dbConnect";
import UserSch from "../../../models/user";
import { authenticateToken } from "../../../utils/authenticateToken";
dbConnect();

const handler = async (req, res) => {
  try {
      const findData = await UserSch.find({email: req.user.email})
      if(findData.length <= 0){
        return res.status(400).json({ data: false });      
      }
      var obj = findData[0];
      obj['branch'] = req.body.data
      console.log(obj)
    //   await UserSch.deleteOne({_id: obj._id})
      const data = new UserSch(obj)
      console.log(data)
    //   await data.save()
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: false });
  }
};

export default authenticateToken(handler);

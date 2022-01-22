const {google} = require('googleapis')
const CLIENT_ID = process.env.DRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

export default async function handler(req,res){
    try {
        const rsp = await drive.files.list({
            q: `'${req.body.id}' in parents`
        })
        // const filtered = rsp.data.files.filter((data)=> data.mimeType === "application/vnd.google-apps.folder")
        // console.log(filtered?.length)
        res.status(200).json(rsp.data.files)
    } catch (error) {
        console.log(error)
        res.status(400).json({data: false})
        return
    }
}
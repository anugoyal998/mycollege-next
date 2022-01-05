export default function splitOtpDate(s){
    var idx = -1;
    var len = 0;
    for(let i = s.length - 1; i >= 0; i--) {
        if(s[i] === '.'){
            idx = i;
            break;
        }
        len++;
    }
    var otp = s.substring(0,idx);
    var date = s.substring(idx+1);
    date = parseInt(date)
    return {otp,date}
}
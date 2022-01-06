const bcrypt = require('bcryptjs')

async function test(data){
    const rsp = await bcrypt.hash(data,10)
    console.log(rsp)
}

async function verify(data,hash){
    const rsp = await bcrypt.compare(data,hash)
    console.log(rsp)
}

// test("123456")
verify("123456","$2a$10$.9v.sBmWk29huMv95s9Ft.NBBPMIcc/CesYbQR/oKSle8eT.GK6Sq")
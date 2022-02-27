class LoginController{

    async loginSuccess(res){
        const {profileObj: data} = res
        if(data?.email?.split('@')[1] !== 'nitkkr.ac.in'){
            alert('Signin using your nit kkr domain')
            return
        }
        console.log(data)
    }
    
    loginFailure(res){
        console.log(res)
    }
}

export default new LoginController()

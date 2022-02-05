class UserDto{
    id;
    email;
    createdAt;
    constructor(user){
        this.id = user._id;
        this.email = user.email
        this.createdAt = user.createdAt
    }
}

module.exports = UserDto
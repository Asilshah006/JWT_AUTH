const UserDB = {
    Users : require('../model/user.json'),
    setUsers : function(data) {this.Users =data }
}

const bcrypt = require('bcrypt')
const fspromises = require('fs').promises
const path = require('path')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleLogin = async (req,res)=>{
    const {user , pwd} = req.body;

    if(!user || !pwd){ 
        return res.status(400).json({"message" : "Username and Password required"})
    }

    const foundUser = UserDB.Users.find(person => person.username === user)

    if(!foundUser){
        return res.status(401).json({"message" : "No user Found"})
    }


    try{
        const roles = Object.values(foundUser.roles)
        const match = await bcrypt.compare(pwd , foundUser.password)

        if(match){
            const AccessToken = jwt.sign(
                    
                { 
                    "UserInfo":{
                        "username" : foundUser.username,
                        "roles" : roles
                    }
                },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : '60s'}
                )
            const RefreshToken = jwt.sign(
                    {"username" : foundUser.username},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn : '1d'}
                )

           const otherUsers = UserDB.Users.filter(person => person.username !== foundUser.username);
           const currentUser = {...foundUser , RefreshToken}
           UserDB.setUsers([...otherUsers , currentUser])

           
           await fspromises.writeFile(path.join(__dirname, ".." , "model" , "user.json"),JSON.stringify(UserDB.Users))
           
           res.cookie('jwt' , RefreshToken , {httpOnly :true , maxAge : 24 * 60 * 60 * 1000 });
           res.status(200).json({AccessToken})
           
                
            


        } else return res.status(401).json({"message" : "Invalid Username and Password"})



    }catch(err){
        res.status(500).json({"message" : err.message})
    }
}

module.exports = {
    handleLogin
}
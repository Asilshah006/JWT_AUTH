const UserDB = {
    Users : require('../model/user.json'),
    setUsers : function(data) {this.Users =data }
}

const bcrypt = require('bcrypt')
const fspromises = require('fs').promises
const path = require('path')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.jwt){ 
        return res.sendStatus(401)
    }

    const refreshToken = cookie.jwt

    const foundUser = UserDB.Users.find(person => person.RefreshToken === refreshToken)

    if(!foundUser){
        return res.sendStatus(403)
    }
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err , decoded) => {
            if(err || foundUser.username !== decoded.username ) return res.sendStatus(402);
            
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(   
                { 
                    "UserInfo":
                    {
                        "username" : decoded.username,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '60s'}
            );
            
            res.json({ accessToken })
        }        
    ); 
}

module.exports = {
    handleRefreshToken
}

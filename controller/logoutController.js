// const UserDB = {
//     Users : require('../model/user.json'),
//     setUsers : function(data) {this.Users =data }
// }

const Users = require('../model/Users')

const bcrypt = require('bcrypt')
const fspromises = require('fs').promises
const path = require('path')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleLogout = async (req,res)=>{
    const cookie = req.cookies;

    if(!cookie?.jwt) return res.sendStatus(204)
    console.log(cookie.jwt);

    const refreshToken = cookie.jwt

    const foundUser = await Users.findOne({refreshToken : refreshToken})
    console.log(foundUser);

    if(!foundUser){
        res.clearCookie('jwt' , {httpOnly : true} )
        return res.sendStatus(204)
    }

    foundUser.refreshToken = ''
    const result = await foundUser.save();
    console.log(result);
    // const otherUsers = UserDB.Users.filter(person => person.RefreshToken !== foundUser.RefreshToken)
    // const currentUser = {...foundUser , RefreshToken : ''}
    // UserDB.setUsers([...otherUsers , currentUser])

    // await fspromises.writeFile(path.join(__dirname,'..' , 'model' , 'user.json'), JSON.stringify(UserDB.Users))

    res.clearCookie('jwt' , {httpOnly : true})
    res.sendStatus(204)
}

module.exports = {handleLogout}
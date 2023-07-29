const UserDB = {
    Users : require('../model/user.json'),
    setUsers : function(data) {this.Users =data }
}

const bcypt = require('bcrypt')
const fspromises = require('fs').promises
const path = require('path')

const handleRegistration = async (req,res)=>{
    const {user , pwd} = req.body;

    if(!user || !pwd){ 
        return res.status(400).json({"message" : "Username and Password required"})
    }

    const duplicate = UserDB.Users.find(person => person.username === user)

    if(duplicate){
        return res.status(409).json({"message" : "Username already taken"})
    }

   try {
    const hashpwd = await bcypt.hash(pwd , 10)

    const newUser = {
        username : user,
        roles : {"User" : 2004},
        password : hashpwd
    }

    UserDB.setUsers([...UserDB.Users , newUser])
   await fspromises.writeFile(path.join(__dirname , ".." , "model" , "user.json") , JSON.stringify(UserDB.Users))

   res.json({"message" : `New User ${user} created`})
   } catch (error) {
       res.status(500).json({"message" : error.message})
   }

}

module.exports = {
    handleRegistration
}
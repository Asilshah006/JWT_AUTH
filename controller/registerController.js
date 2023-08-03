// const UserDB = {
//     Users : require('../model/user.json'),
//     setUsers : function(data) {this.Users =data }
// }

const Users = require('../model/Users')

const bcypt = require('bcrypt')
const fspromises = require('fs').promises
const path = require('path')

const handleRegistration = async (req,res)=>{
    const {user , pwd} = req.body;

    if(!user || !pwd){ 
        return res.status(400).json({"message" : "Username and Password required"})
    }

    const duplicate = await Users.findOne({username : user})

    if(duplicate){
        return res.sendStatus(409).json({"message" : "Username already taken"})
    }

   try {
    const hashpwd = await bcypt.hash(pwd , 10)

    const result = await Users.create ({
        username: user,
        password : hashpwd
    })

//     UserDB.setUsers([...UserDB.Users , newUser])
//    await fspromises.writeFile(path.join(__dirname , ".." , "model" , "user.json") , JSON.stringify(UserDB.Users))

    console.log(result);

   res.json({"message" : `New User ${user} created`})
   } catch (error) {
       res.status(500).json({"message" : error.message})
   }

}

module.exports = {
    handleRegistration
}
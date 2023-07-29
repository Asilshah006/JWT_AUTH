const whiteList = [
    "http://localhost:3500",
    "https:www.google.com",
    "https:www.facebook.com",
    "http://localhost:3000"
]

const corsOption = {
    origin : (origin , callback) =>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null , true)
        }else{
            callback(new Error("Not Allowed By Cors"))
        }
    },
    optionsSuccessStatus : 200
}

module.exports = corsOption
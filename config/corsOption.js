const whiteList = [
    "http://localhost:3500",
    "https://www.google.com",
    "https:www.facebook.com",
    "http://localhost:3000"    
]

// const corsOption = {
//     origin : (origin , callback) =>{
//         if(whiteList.indexOf(origin) !== -1 || !origin){
//             callback(null , true)
//         }else{
//             callback(new Error("Not Allowed By Cors"))
//         }
//     },
//     optionsSuccessStatus : 200,
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// }


var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }


module.exports = corsOptions
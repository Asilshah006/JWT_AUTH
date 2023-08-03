// const data = {
//     employee : require('../model/employees.json'),
//     setEmployees : function(data){this.employee = data}
// }

const data = require('../model/Employees')

const getEmployees = async (req , res)=>{
    const employees = await data.find().exec()
    if(!employees) return res.json(204).json({"message" : "No Employees Found"})
    res.json(employees)
}

const createEmployee = async (req , res)=>{
    // const newEmployee = {
    //     id: data.employee.length? data.employee[data.employee.length - 1].id + 1 : 1,
    //     firstname : req.body.firstname,
    //     lastname : req.body.lastname
    // }

    if(!req.body.firstname || !req.body.lastname){
        res.status(401).json({"message" : "Firstname and lastname required"})
    }

   try{

    const result = data.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname
    })

    // data.setEmployees([...data.employee , newEmployee])

    res.status(200).json(result)
   }catch(err){
    console.log(err);
   }

}

const updateEmployee = async (req,res)=>{
    if(!req.body.id){
        res.status(401).json({"message" : "Employee id required"})
    }
    
    const employe = await data.finOne({_id :req.body.id})
    if(!employe){
        res.status(401).json({"message" : "No Employee Matches id "})   
    }

    if(req.body.firstname) employe.firstname = req.body.firstname
    if(req.body.lastname) employe.lastname = req.body.lastname

    // const otherUser = data.employee.filter(emp =>
    //     emp.id !== parseInt(req.body.id)
    // )

    // const unsortedArray = [...otherUser , employe] 

    // data.setEmployees(unsortedArray.sort((a,b)=>{a.id > b.id ? 1 : a.id < b.id ? -1 : 0}))

    const result = await employe.save()

    res.status(200).json(result)
}

const deleteEmployee = async (req,res)=>{
    if(!req.body.id){
        res.status(401).json({"message" : "Employee id required"})
    }
    
    const employe = await data.findOne({_id : req.body.id})
    
    if(!employe){
        res.status(401).json({"message" : "No Employee Matches id "})   
    }

    // const otherUser = data.employee.filter(emp =>
    //     emp.id !== parseInt(req.body.id)
    // )
    
    // data.setEmployees([otherUser])
   
    const result = await data.deleteOne({_id : req.body.id})

    res.status(200).json(result)

}

const getEmployee = async (req,res)=>{

    if(!req.params.id){
        res.status(401).json({"message" : "Employee id required"})
    }
    const employe = await data.findOne({_id : req.params.id})
    console.log(employe)
    if(!employe){
        res.status(401).json({"message" : "No Employee Matches id "})   
    }    
    res.json(employe)
}


module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}

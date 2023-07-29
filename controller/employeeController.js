const data = {
    employee : require('../model/employees.json'),
    setEmployees : function(data){this.employee = data}
}

const getEmployees = (req , res)=>{
    res.json(data.employee)
}

const createEmployee = async (req , res)=>{
    const newEmployee = {
        id: data.employee.length? data.employee[data.employee.length - 1].id + 1 : 1,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(401).json({"message" : "Firstname and lastname required"})
    }



    data.setEmployees([...data.employee , newEmployee])

    res.status(200).json(data.employee)

}

const updateEmployee = async (req,res)=>{
    if(!req.body.id){
        res.status(401).json({"message" : "Employee id required"})
    }
    console.log(req.body);
    const employe = data.employee.find(emp => emp.id === req.body.id)
    console.log(employe)
    if(!employe){
        res.status(401).json({"message" : "No Employee Matches id "})   
    }

    if(req.body.firstname) employe.firstname = req.body.firstname
    if(req.body.lastname) employe.lastname = req.body.lastname

    const otherUser = data.employee.filter(emp =>
        emp.id !== parseInt(req.body.id)
    )

    const unsortedArray = [...otherUser , employe] 

    data.setEmployees(unsortedArray.sort((a,b)=>{a.id > b.id ? 1 : a.id < b.id ? -1 : 0}))
    
    res.status(200).json({"message" : "Successfully Updated"})
}

const deleteEmployee = async (req,res)=>{
    if(!req.body.id){
        res.status(401).json({"message" : "Employee id required"})
    }
    console.log(req.body);
    const employe = data.employee.find(emp => emp.id === req.body.id)
    console.log(employe)
    if(!employe){
        res.status(401).json({"message" : "No Employee Matches id "})   
    }

    const otherUser = data.employee.filter(emp =>
        emp.id !== parseInt(req.body.id)
    )
    
    data.setEmployees([otherUser])
        
    res.status(200).json({"message" : "Successfully Deleted"})

}

const getEmployee = async (req,res)=>{

    if(!req.params.id){
        res.status(401).json({"message" : "Employee id required"})
    }

    console.log(req.body);
    const employe = data.employee.find(emp => emp.id === req.params.id)
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

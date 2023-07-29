const express = require('express')
const router = express.Router()

const employeeController = require('../../controller/employeeController')
const roles_list = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')


router.route('/')
    .get(employeeController.getEmployees)
    .post(verifyRoles(roles_list.Admin , roles_list.Editor),employeeController.createEmployee)
    .put(verifyRoles(roles_list.Admin , roles_list.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(roles_list.Admin),employeeController.deleteEmployee)
    
router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router
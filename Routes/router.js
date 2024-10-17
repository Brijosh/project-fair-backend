//1. mport express
const express= require('express')

// 4. import usercontroller
const usercontroller= require('../Controllers/userController')
const projectController =require('../Controllers/projectController')

// import middleware
const multerconfig=require('../Middleware/multerMiddleware')
const jwtMiddleware=require('../Middleware/jwtMiddleware')

// 2. Create router from express
const router =express.Router()

// 3. Create route for each request
    // 1. Register route: https://localhost:3000/api/register
    router.post('/api/register',usercontroller.register)

    // 2. login route: https://localhost:3000/api/login
    router.post('/api/login',usercontroller.login)

     // 3. add project route: https://localhost:3000/api/addproject
     router.post('/api/addProject',jwtMiddleware,multerconfig.single('projectImg'),projectController.addProject)


    // 4.get all  project
    router.get('/api/getAllProjects',jwtMiddleware,projectController.allProjects)
    // 5.get all project of particular user
    router.get('/api/getUserProjects',jwtMiddleware,projectController.userProjects)
    // 6.get home project 
    router.get('/api/getHomeProjects',projectController.homeProjects)

    // 7. edit project route: https://localhost:3000/api/editproject
    router.put('/api/updateproject/:projectId',jwtMiddleware,multerconfig.single('projectImg'),projectController.editProject)

    // 7. delete project route: https://localhost:3000/api/deleteproject
    router.delete('/api/deleteProject/:projectId',jwtMiddleware,projectController.deleteProject)


module.exports=router
const express =require('express')
const userController=require('../controllers/useContoller')
const projectController=require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router=new express.Router

// register:http://localhost:3000/register
router.post('/register',userController.registerController)

// register:http://localhost:3000/login
router.post('/login',userController.loginController)

//add-project:http://localhost:3000/add-projects 
router.post('/add-projects',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

//homeProject :http://localhost:3000/home-projects
router.get('/home-projects',projectController.homePageProjectController)

//allProjects :http://localhost:3000/all-projects
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)

// userProjects :http://localhost:3000/user-projects
router.get('/user-projects',jwtMiddleware,projectController.userProjectController)

// editProjects :http://localhost:3000/projects/id/edit
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)

// removeProjects :http://localhost:3000/projects/id/remove
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

// edit-user :http://localhost:3000/edit-user 
router.put('/edit-user',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserController)






module.exports=router
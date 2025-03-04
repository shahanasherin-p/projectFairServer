const projects=require('../models/projectModel')

// add projects -authorisation needed

exports.addProjectController=async(req,res)=>{
    console.log("Inside addProjectController")

    const userId=req.userId
    console.log(userId)
    const {title,languages,overview,github,website}=req.body
    const projectImg=req.file.filename
    console.log(title,languages,overview,github,website,projectImg)

    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist in our collection.. Pleade Upload another One")
        }else{
            const newProject=new projects({title,languages,overview,github,website,projectImg,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}



// get home project -no need  authorisation

exports.homePageProjectController=async(req,res)=>{
    console.log("Inside homePageProjectController")
    try{
        const allHomeProjects=await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


// get allProjects -need  authorisation

exports.allProjectsController=async(req,res)=>{
    console.log("Inside allProjectsController")
    const searchKey=req.query.search
    console.log(searchKey)
    const query={
        languages:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}



// get user project -need  authorisation

exports.userProjectController=async(req,res)=>{
    console.log("Inside userProjectController")
    const userId=req.userId
    try{
        const allUserProjects=await projects.find({userId})
        res.status(200).json(allUserProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// editProject -need  authorisation

exports.editProjectController=async(req,res)=>{
    console.log("Inside editProjectController")
    const id=req.params.id
    const userId=req.userId
    const {title,languages,overview,github,website,projectImg}=req.body
    const reUploadProjectImg=req.file?req.file.filename:projectImg
    try{
        const updateProject=await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImg:reUploadProjectImg,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch (err){
        res.status(401).json(err)
    }


}

// removeProject -need  authorisation

exports.removeProjectController=async(req,res)=>{
    console.log("Inside removeProjectController")
    const {id}=req.params
    try{
        const deleteProject= await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)
    }
    catch (err){
        res.status(401).json(err)
    }
}
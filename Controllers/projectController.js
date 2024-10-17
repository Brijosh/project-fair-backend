const projects = require('../Models/projectSchema')

exports.addProject=async(req,res)=>{
    console.log("inside add project");
    const {title,language,website,github,overview}=req.body
    const projectImg=req.file.filename
    const userId= req.payload
    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exisits")
        }
        else{
            const newProject=new projects({
                title,language,website,github,overview,projectImg,userId 
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(error){
        res.status(500).json("server error" + error)
        
    }
}


exports.allProjects=async(req,res)=>{
    console.log("inside all projects");
    const searchKey=req.query.search
    const query={
        title:{
            $regex:searchKey,
            $options:'i'
        }
    }
    try{
        const allProject=await projects.find(query)
        res.status(200).json(allProject)
    }
     catch(error){
        res.status(500).json("server error" + error)
        
    }
}

exports.homeProjects=async(req,res)=>{
    console.log("inside home projects");
    try{
        const homeProject=await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
     catch(error){
        res.status(500).json("server error" + error)
        
    }
}

exports.userProjects=async(req,res)=>{
    console.log("inside user projects");
    const userId= req.payload
    
    try{
        const userProject=await projects.find({userId})
        res.status(200).json(userProject)
    }
     catch(error){
        res.status(500).json("server error" + error)
        
    }
}


// edit project
exports.editProject=async(req,res)=>{
    console.log("inside edit project");
    const {title,language,website,github,overview,projectImg}=req.body
    const uploadImg=req.file? req.file.filename:projectImg
    const userId= req.payload
    const {projectId}= req.params
    try{
        const updateProject=await projects.findByIdAndUpdate({_id:projectId},{title:title,language:language,website:website,github:github,projectImg:uploadImg,overview:overview,userId:userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(error){
        res.status(401).json("internal error" + error)
        
    }
}


// delete project
exports.deleteProject=async(req,res)=>{
    console.log("inside edit project");
    const {projectId}= req.params
    try{
        const updateProject=await projects.findByIdAndDelete({_id:projectId})
        res.status(200).json("projects delete Project")
    }
    catch(error){
        res.status(401).json("internal error" + error)
        
    }
}
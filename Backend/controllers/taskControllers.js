import Task from "../models/taskModels.js";




//  create Task
const createTask = async(req, res)=>{
   try{
    const { title, description, dueDate, priority } = req.body;

    if(!title || !description  ||  !dueDate || !priority){
       return  res.status(400).json({
               success : false,
               message: "Please assign all field",
        })
    }

    const newTask = new Task({
        title , 
        description,
        dueDate,
        priority,
        userId : req.user.id,
    })

    await newTask.save();
    console.log(newTask);
    res.status(201).json({
        success : true,
        message : "Task Created Sucessfully",
        task : newTask,
      })
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Failed to create Task"
    })
   }

}


// Fetch All task
const getAllTask = async(req,res)=>{
    try{
        const tasks = await Task.find({
            userId : req?.user?.id
        }).populate("userId", "username email");
        if(!tasks){
           return res.status(400).json({
            success:false,
            message: "Task Does not exist",
           })
        }
        console.log("get", tasks);
        res.status(200).json({
            success: true,
            message : "Get All Task",
            tasks,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ 
            success : false,
            error: "Error fetching tasks" 
        });
    }
}




//  Update Task
const updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ 
                success : false,
                message: "Task not found" 
            });
        }
        

        if(task.userId.toString() !== req.user.id){
            return res.status(403).json({
                 success: false,
                 message: "Unauthorized User",
                 });
        }

        console.log(task);
        Object.assign(task, req.body);
        await task.save();
        res.status(201).json({
            success : true,
            message : "Task updated successfully",
            task,
        });

    }
    catch(error){
        res.status(500).json({ 
            success : false,
            error: "Error in updating tasks" 
        });
    }
}

//  Delete Task
const  deleteTask = async(req,res)=>{
  try{
    const taskId =  req.params.id;
    const task = await Task.findById(taskId);

    if(!task){
        return res.status(404).json({ 
            success : false,
            message: "Task not found"
         });
    }

    if (task.userId.toString() !== req.user.id){
        return res.status(403).json({ 
            success : false,
            message: "Unauthorized User"
         });
    }

    await task.deleteOne();
    console.log(task);
    res.status(201).json({ 
        success : true,
        message: "Task deleted successfully"
     });
  }

  catch(error){
    res.status(500).json({ 
        success : false,
        error: "Error in deleting tasks" 
    });
  }
}



//  Task MarkAs Completed

const taskCompleted = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found"
             });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized User"
            });
        }

        task.completed = true;
        await task.save();
        console.log(task);
        res.status(201).json({ 
            success: true,
            message: "Task marked as completed",
            task 
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false,
            error: "Error marking task as completed"
         });
    }
}


export{
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    taskCompleted,
};

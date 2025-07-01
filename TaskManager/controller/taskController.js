const Task = require('../model/tasks');

exports.getIndex = (req,res)=>{
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    Task.find().then((registeredTasks) => {
        res.render("index",{
            registeredTasks: registeredTasks,
            pageTitle: "Home Page",
            currentPage: "index",
            isLoggedIn: req.session.isLoggedIn
        })
    })
};
exports.getAddTask = (req,res)=>{
    res.render("add-task",{
        pageTitle: "Add Task",
        currentPage: "add-task",
        editing: false
    })
};
exports.postAddTask = (req,res)=>{
    const {title,status} = req.body;
    const task = new Task ({
        title,
        status
    });
    task.save().then(()=>{
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    });
};
exports.getEditTask = (req,res)=>{
    const taskId = req.params.id;
    const editing = req.query.editing==="true";

    Task.findById(taskId).then((task)=>{
        if(!task) {
            console.log("Task not found for editing");
            return res.redirect("/");
        }
        console.log(taskId,editing,task)
        res.render("edit-task", {
            task: task,
            pageTitle: "Edit your task",
            currentPage: "edit-home",
            editing: editing,
        });
    });
};
exports.postEditTask = (req,res)=>{
    const {id, title,status} = req.body;
    Task.findById(id).then((task)=> {
        task.title = title;
        task.status = status;
        task.save().then((result)=> {
            console.log("Task updated", result);
        }).catch(err => {
            console.log("Error while updating", err);
        })
        res.redirect("/");
    }).catch(err => {
        console.log("Error while finding home", err);
    });
};
exports.postDeleteTask = (req,res)=>{
    const taskId = req.params.id;
    console.log("Came to delete ", taskId);
    Task.findByIdAndDelete(taskId)
    .then(()=> {
        res.redirect("/");
    })
    .catch((error)=> {
        console.log("Error while deleting ", error);
    })
};
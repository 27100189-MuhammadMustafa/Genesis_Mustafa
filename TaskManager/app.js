const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const taskRouter = require('./routes/taskRouter');
const errorsController = require('./controller/errorsController');
const authRouter = require('./routes/authRouter');

const app = express();

app.set("view engine","ejs");
app.set("views","views");
const DB_URL = "mongodb+srv://javedmustafa557:Mustafa123456789@mustafa.ixs2atb.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Mustafa"

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
}))
app.use((req,res,next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
})
app.use(authRouter);
app.use(taskRouter);
app.use(errorsController.pageNotFound);



const PORT = 3000;
mongoose.connect(DB_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
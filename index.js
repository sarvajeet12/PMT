const express = require('express');
const path = require("path");
const app = express();
require('./DB/conn');
const projectManger = require('./DB/modalSchema');

const port = process.env.PORT || 5500;

//-------------view------------
app.set("view engine", "ejs"); 
const dynamic_path = path.join(__dirname,"./templates/views");
app.set("views", dynamic_path);

// -------------public file---------
app.use(express.static("public")); 

// middleware
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));


// Home Page
app.get("/", async (req,resp)=>{
   resp.render("home");
}); 


// display page
app.get("/display", async (req,resp)=>{
    const userDetails = await projectManger.find({});
    resp.render("display",{
        datas : userDetails
    });
});

// Task Page
app.get("/task/:id", async (req,resp)=>{
    const {id} = req.params;
    const userTask = await projectManger.findById({_id:id});
    resp.render("task",{
        taskUpdate : userTask
    });
});

// add user info in the database (post method) 
app.post('/', async (req,resp)=>{
    try {
        const users = new projectManger({
            userid: req.body.userid,
            userName: req.body.userName,
            task: req.body.task,
            status: req.body.status
        });
        const result = await users.save();
        resp.redirect("/display");
    } catch (error) {
        resp.render("home",{
            error: "This id is already exits"
        })
    }
})

// update (post method)
app.post('/task/:id',async (req,resp)=>{
    const {id} = req.params;
    const {task,status}=req.body;
    const update =  await projectManger.findByIdAndUpdate(
        {_id:id},
        {task,status},
        {new:true}
    );
    resp.redirect('/display');  
});

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});
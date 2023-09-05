const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud',{
    useNewUrlParser:true
}).then(()=>{
    console.log("Database Successfully Connected");
}).catch(()=>{
    console.log("Connection Error");
});
//crud -> database name
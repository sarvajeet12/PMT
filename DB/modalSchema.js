const mongoose = require('mongoose');

const userPM = new mongoose.Schema({
        userid:{
            type:Number,
            required:true,
            unique:true
        },
        userName:{
            type:String,
            required:true,
        },
        task:{
            type:String,
            required:true
        },
        status:{
            type:String,
            require: true
        }
    }, {timestamps: true}
);


const projectManger = new mongoose.model('Pmt',userPM);
module.exports = projectManger;

//Pmt is a collection name

//note : value of name attribute (in html or ejs) must be same as
//name written in schema
const mongoose = require("mongoose");
const { Schema } = mongoose;


const TaskSchema = new Schema({
  id: {
    type:String
    
  },
  notes : [{
    title: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
 
    
     }],
  Date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

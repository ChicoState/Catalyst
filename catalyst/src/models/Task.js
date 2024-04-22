import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema({
  TaskName: {
    type: String,
    required: true,
    default: ''
  },
  Description: {
    type: String,
    default: ''
  },
  TimeInfo: {
    type: String,
    default: ''
  }
}, {      // Modify the way the toJSON function returns the object for generation
  toJSON: {
    transform: function(doc, ret){
      delete ret._id
      return ret
    }
  }
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;

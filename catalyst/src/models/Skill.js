import mongoose from 'mongoose';
import Task from './Task.js'; // Adjust the path as necessary

// Assuming taskSchema is defined in the Task model as shown earlier

const skillSchema = new mongoose.Schema({
  SkillName: {
    type: String,
    required: true,
    default: ''
  },
  Tasks: [Task], // Embedding Task documents directly into Skill
  Description: {
    type: String,
    default: ''
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      // Modify the toJSON transformation for Skill as needed
      delete ret.__v; // For example, removing the version key if not needed
      return ret;
    }
  }
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;

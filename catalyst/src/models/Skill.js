import mongoose from 'mongoose';
import Task from './Task.js';


const skillSchema = new mongoose.Schema({
  SkillName: {
    type: String,
    required: true,
    default: ''
  },
  Tasks: [Task.schema], 
  Description: {
    type: String,
    default: ''
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;

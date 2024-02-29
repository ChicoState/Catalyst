class Task {
    constructor() {
      this.TaskName = "";
      this.TimeInfo = "";
    }
  
    // Function to return a JSON representation of the class variables
    toJSON() {
      return JSON.stringify({ TaskName: this.TaskName, TimeInfo: this.TimeInfo });
    }
  
    // Function to update the class variables
    update(taskName, timeInfo) {
      this.TaskName = taskName;
      this.TimeInfo = timeInfo;
    }
  }
  

module.exports = Task;
const { GoogleGenerativeAI } = require("@google/generative-ai")
  
const Skill = require("./models/Skill")
const Task = require("./models/Task")

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function parseTasksToJsonObjects(taskJsonString) {
  // Take a string and parse it for json information. Must be in the task format
  const taskObjects = JSON.parse(taskJsonString);
  const tasks = taskObjects.map(taskData => {
    const task = new Task();
    task.update(taskData.TaskName, taskData.TimeInfo);
    return task;
  });
  return tasks;
}

async function createPlan(new_skill) {
  // For text-only input, use the gemini-pro model

  // Conduct an object check
  if (!(new_skill instanceof Skill)) {
    console.log("Object passed to createPlan is not of type Skill");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  let task_example = new Task();

  // Take items from the skill and pass it to the prompt
  const prompt = `Develop a list of tasks for new skill ${new_skill.SkillType}, where I can dedicate ${new_skill.TimeCommitment}. Be very articulate about each description, provide as much information as necessary. For example, if the task is weight lifting, specify sets and reps. If the task is cooking, specify new spices to try. Output each element in JSON format using the following template: ${task_example.toJSON()}, ensure that it is a list of this object`;

  console.log(prompt)

  // Get Response
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  let listOfTasks = parseTasksToJsonObjects(text);

  console.log(listOfTasks)
  // Return list of Task objects
  return listOfTasks;
}

module.exports = createPlan;

//let skill = new Skill("Weight lifting", "40 minutes a day");
//createPlan(skill);
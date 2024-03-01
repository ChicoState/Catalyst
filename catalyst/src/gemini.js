const { GoogleGenerativeAI } = require("@google/generative-ai")
  
const Task = require("./models/Task");
const { type } = require("@testing-library/user-event/dist/type");

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

function validate_questionnaire_format(obj){
  if (typeof obj !== 'object' || obj == null){
    return false;
  }

  // Iterate over the list and make sure the values are an array of strings of size 2
  for( const [key, value] of Object.entries(obj)){
    if(!Number.isInteger(parseInt(key))){
        return false;
    }
  

    // check if array is of size 2
    if( !Array.isArray(value) || value.length != 2 || !value.every(v => typeof v === 'string')){
        return false;
    }
  }
  return true;
}

async function createPlan(filled_questionnaire) {
  // We expect an dictionary with indexs at the key and the values an array of strings of size 2
    if(!validate_questionnaire_format(filled_questionnaire)){
        console.log(filled_questionnaire);
        console.error("Object passed to gemini is not of valid format.");
    } 

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  let task_example = new Task();

    let stringifiedQuestionnaire = '';
    // Create the string for the questionnaire
    for (let key in filled_questionnaire){
        stringifiedQuestionnaire += `${filled_questionnaire[key][0]}\n${filled_questionnaire[key][1]}\n\n`;
    }

  // Take items from the skill and pass it to the prompt
  const prompt = `You are a task generation model used to create a set of tasks for people to do weekly in order to improve a specfic skill they are interested in. A person has filled out a questionnaire with the following information: 
  
    ${stringifiedQuestionnaire}

  Your task is to generate a list of tasks that this person can do weekly in order to improve themselves at this skill. Given the above questionniare, output a list of tasks. Each element should utilize JSON format using following template: ${task_example.toJSON()}. Ensure that each element in the list follows the format and that the output is a JSON list of these objects.`;

  console.log(prompt);
  // Get Response
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  let listOfTasks = parseTasksToJsonObjects(text);

  // Return list of Task objects
  return listOfTasks;
}

module.exports = createPlan;

//let skill = new Skill("Weight lifting", "40 minutes a day");
//createPlan(skill);
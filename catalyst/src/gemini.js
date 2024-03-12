////////////////////////////////////////////////////////////////////////////////
//
//  Initial Author: Lucas Butler
//  Date: Mar 1, '24
//  Description:
//      This .js file takes in a questionnaire and uses prompt engineering and
//  the gemini API to create a list of task objects for the user to complete.
//
////////////////////////////////////////////////////////////////////////////////

import { GoogleGenerativeAI } from '@google/generative-ai';
import Task from './models/Task.js';

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

function validate_questionnaire_format(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return false;
  }

  // Iterate over the list and make sure the values are an array of strings of size 2
  for (const [key, value] of Object.entries(obj)) {
    if (!Number.isInteger(parseInt(key))) {
      return false;
    }

    // check if array is of size 2
    if (!Array.isArray(value) || value.length !== 2 || !value.every(v => typeof v === 'string')) {
      return false;
    }
  }
  return true;
}

async function createPlan(filled_questionnaire, num_items) {
  // We expect a dictionary with indexes at the key and the values an array of strings of size 2
  if (!validate_questionnaire_format(filled_questionnaire)) {
    console.log(filled_questionnaire);
    console.error("Object passed to gemini is not of a valid format.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  let task_example = new Task();

  // Create the string for the questionnaire
  let stringifiedQuestionnaire = '';
  for (let key in filled_questionnaire) {
    stringifiedQuestionnaire += `${filled_questionnaire[key][0]}\n${filled_questionnaire[key][1]}\n\n`;
  }

  // Output list of tasks
  let listOfTasks = [];

  for (let i = 0; i < num_items; i++) {

    let listOfTasks_string = listOfTasks && Array.isArray(listOfTasks) ? JSON.stringify(listOfTasks) : '[]';

    // Prompt construction used for generation
    const prompt = `You are a task generation model used to create a set of tasks for people to do weekly in order to improve a specific skill they are interested in. A person has filled out a questionnaire with the following information: 

      ${stringifiedQuestionnaire}

    Your task is to generate a task that this person can do weekly to improve themselves at this skill. Given the above questionnaire, output another task in JSON format using the following template: ${task_example.toJSON()}. Ensure that the element is in the specified format and that the information in the object is clear, concise, and articulate. Generate 1 more element that complements the following list. If there are no elements currently, then generate a good starting point for someone to focus on.

    Existing list:
    ${listOfTasks_string}
    `;

    console.log(prompt);

    // Request generation, if the generation cannot be parsed, request it again
    let successful_generation = false;
    let task;

    do {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);

        // Modify this part to handle non-JSON responses gracefully
        try {
          task = JSON.parse(text);
        } catch (jsonError) {
          console.error('Error parsing generated content as JSON:', jsonError);
          throw new Error('Invalid JSON format');
        }

        successful_generation = true;
      } catch (error) {
        console.log('Could not parse generation, trying again...');
      }
    } while (!successful_generation);
    console.log(task);

    listOfTasks.push(task);
  }

  listOfTasks = parseTasksToJsonObjects(JSON.stringify(listOfTasks));
  console.log(listOfTasks);

  // Return a list of Task objects
  return listOfTasks;
}

export default createPlan;

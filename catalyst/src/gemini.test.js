import validate_questionnaire_format from './gemini.js';
import validate_task_format from './gemini.js';
import createPlan from './gemini.js';
import Questionnaire from './Questionnaire';

jest.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () => Promise.resolve(JSON.stringify({ id: 1, description: "Sample Task" }))
          }
        })
      })
    }))
  }));

describe('validate_questionnaire_format', () => {
  test('returns true for valid questionnaire format', () => {
    const questionnaire = {
      0: ['Question 1', 'Answer 1'],
      1: ['Question 2', 'Answer 2']
    };
    expect(validate_questionnaire_format(questionnaire)).toBe(true);
  });

  test('returns false for non-object input', () => {
    const questionnaire = 'not an object';
    expect(validate_questionnaire_format(questionnaire)).toBe(false);
  });

  test('returns false for null input', () => {
    const questionnaire = null;
    expect(validate_questionnaire_format(questionnaire)).toBe(false);
  });

  test('returns false for incorrect array size', () => {
    const questionnaire = {
      0: ['Question 1'],
      1: ['Question 2', 'Answer 2', 'Extra']
    };
    expect(validate_questionnaire_format(questionnaire)).toBe(false);
  });

  test('returns false for non-array values', () => {
    const questionnaire = {
      0: 'Question 1',
      1: ['Question 2', 'Answer 2']
    };
    expect(validate_questionnaire_format(questionnaire)).toBe(false);
  });
});

// describe('validate_task_format', () => {
//   test('returns true for two matching task objects', () => {
//     const task1 = { id: 1, description: "Do something" };
//     const task2 = { id: 1, description: "Do something" };
//     expect(validate_task_format(task1, task2)).toBe(true);
//   });

//   test('returns false for objects with different keys', () => {
//     const task1 = { id: 1, description: "Do something" };
//     const task2 = { id: 1 };
//     expect(validate_task_format(task1, task2)).toBe(false);
//   });

//   test('returns false for objects with different number of keys', () => {
//     const task1 = { id: 1, description: "Do something", extra: "Extra" };
//     const task2 = { id: 1, description: "Do something" };
//     expect(validate_task_format(task1, task2)).toBe(false);
//   });
// });

// describe('createPlan', () => {
//   test('returns a list of tasks with valid tasks added', async () => {
//     const filled_questionnaire = {
//       0: ['Question 1', 'Answer 1'],
//       1: ['Question 2', 'Answer 2']
//     };
//     const num_items = 1;
//     const existingTasks = [{ id: 1, description: "Read a relevant book" }];

//     const tasks = await createPlan(filled_questionnaire, num_items, existingTasks);
//     expect(tasks.length).toBeGreaterThan(existingTasks.length);
//     expect(tasks.every(task => validate_task_format(task, new Task()))).toBe(true);
//   });

//   test('logs an error for invalid existing tasks', async () => {
//     const filled_questionnaire = {
//       0: ['Question 1', 'Answer 1'],
//       1: ['Question 2', 'Answer 2']
//     };
//     const num_items = 1;
//     const existingTasks = [{ wrongKey: "Not a task" }];
//     const spy = jest.spyOn(console, 'error');

//     await createPlan(filled_questionnaire, num_items, existingTasks);
//     expect(spy).toHaveBeenCalledWith("Task list not in valid format.");
//   });
// });

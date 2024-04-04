import gemini from './gemini.js'

const questions = [
    {
      type: 'text',
      questionText: 'Describe the skill you would like to pursue:',
    },
    {
      type: 'select',
      questionText: 'How many hours per week would you like to spend improving this skill?',
      options: ['Unspecified','1-10', '11-20', '21-30', '31+'],
    },
    {
      type: 'select',
      questionText: 'What is your current experience level at this task?',
      options: ['Unspecified', 'Beginner', 'Intermediate', 'Experienced'],
    },
    {
      type: 'text',
      questionText: 'Is there a specific area that you would like to focus on? (optional)',
    },
  ];


  const filled_questionnaire = {};
  questions.forEach((question, index) => {
    filled_questionnaire[index] = responses[index] || [question.questionText, ''];
  });
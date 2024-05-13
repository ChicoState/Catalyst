import validate_questionnaire_format from './gemini';
import validate_task_format from './gemini';
import createPlan from './gemini';
import Questionnaire from './Questionnaire';

//TESTS THE VALIDATE_QUESTIONAIRRE FORMAT FUNCTION
test('null input', () => {
    const questionnaire = null;
    var rightFormat = validate_questionnaire_format(questionnaire);
    expect (rightFormat.toBe (false));
});

test('empty input', () => {
  const questionnaire = "";
  var format = validate_questionnaire_format(questionnaire);
  expect (rightFormat.toBe (false));
});

test('array size 5 input', () => {
  const questionnaire = { 0:['1','2','3','4','5']};
  var  rightFormat = validate_questionnaire_format(questionnaire);
  expect(rightFormat.toBe(false));
});

test('array size one', () => {
  const questionnaire = {0:['1']};
  var rightFormat = validate_questionnaire_format(str);
  expect(rightFormat.toBe(false));
});

test('array size two', () => {
  const str = {0:['1','2']};
  var rightFormat = validate_questionnaire_format(str);
  expect(rightFormat.toBe(true));
});

test('array size one and two', () => {
  const str = {
    0:['Q1','Q2']
    1:['Q1']
  };
  var rightFormat = validate_questionnaire_format(str);
  expect(rightFormat.toBe(true));
});

test('array size two and two', () => {
  const str = {
    0:['Q1','Q2']
    1:['Q1','Q2']
  };
  var rightFormat = validate_questionnaire_format(str);
  expect(rightFormat.toBe(true));
});


//TESTS THE VALIDATE_TASK_FORMAT FUNCTION
test('both empty', () => {
  var rightFormat = validate_task_format("","");
  expect(rightFormat.toBe(false));
});

test('both null', () => {
  var rightFormat = validate_task_format(null,null);
  expect(rightFormat.toBe(false));
});

test('null and non-object', () => {
  var format = validate_task_format(null,42);
  expect(format.toBe(false));
});

test('null and object', () => {
  var format = validate_task_format(null,Object);
  expect(format.toBe(false));
});

test('non-object and null', () => {
  var format = validate_task_format("Hi",null);
  expect(format.toBe(false));
});

test('both non-objects', () => {
  var format = validate_task_format(21,42);
  expect(format.toBe(false));
});

test('non-object and object', () => {
  var format = validate_task_format(3,Object);
  expect(format.toBe(false));
});

test('object and null', () => {
  var format = validate_task_format(Object,null);
  expect(format.toBe(false));
});

test('Object and non-object', () => {
  var format = validate_task_format(Object,42);
  expect(format.toBe(false));
});

//lengths are not same
test('both objects', () => {
  var format = validate_task_format([1,2,3],[4,5]);
  expect(format.toBe(false));
});

//lengths are same key 2 doesn't include key
test('both objects', () => {
  var format = validate_task_format([1,2,3],[4,5,6]);
  expect(format.toBe(false));
});

//lengths are same key 2 includes key
test('both objects', () => {
  var format = validate_task_format([1,2,3],[1,2,3]);
  expect(format.toBe(true));
});

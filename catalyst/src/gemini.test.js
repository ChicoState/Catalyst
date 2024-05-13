import validate_questionnaire_format from './gemini';
import validate_task_format from './gemini';
import createPlan from './gemini';

//TESTS THE VALIDATE_QUESTIONAIRRE FORMAT FUNCTION
test('null input', () => {
    boolean format = validate_questionnaire_format(null);
    expect (format.toBe (false));
});

test('empty input', () => {
  boolean format = validate_questionnaire_format("");
  expect (format.toBe (false));
});

test('array input', () => {
  const sample_array = {1,2,3,4,5};
  boolean  format = validate_questionnaire_format(sample_array);
  expect(format.toBe(false));
});

test('string over size two', () => {
  const str = "Hello World";
  boolean format = validate_questionnaire_format(str);
  expect(format.toBe(false));
});

test('string size one', () => {
  const str = "Z";
  boolean format = validate_questionnaire_format(str);
  expect(format.toBe(false));
});

test('string size two', () => {
  const str = "Hi";
  boolean format = validate_questionnaire_format(str);
  expect(format.toBe(true));
});


//TESTS THE VALIDATE_TASK_FORMAT FUNCTION
test('both empty', () => {
  boolean format = validate_task_format("","");
  expect(format.toBe(false));
});

test('both null', () => {
  boolean format = validate_task_format(null,null);
  expect(format.toBe(false));
});

test('null and non-object', () => {
  boolean format = validate_task_format(null,42);
  expect(format.toBe(false));
});

test('null and object', () => {
  boolean format = validate_task_format(null,Object);
  expect(format.toBe(false));
});

test('non-object and null', () => {
  boolean format = validate_task_format("Hi",null);
  expect(format.toBe(false));
});

test('both non-objects', () => {
  boolean format = validate_task_format(21,42);
  expect(format.toBe(false));
});

test('non-object and object', () => {
  boolean format = validate_task_format(3,Object);
  expect(format.toBe(false));
});

test('object and null', () => {
  boolean format = validate_task_format(Object,null);
  expect(format.toBe(false));
});

test('Object and non-object', () => {
  boolean format = validate_task_format(Object,42);
  expect(format.toBe(false));
});

//lengths are not same
test('both objects', () => {
  boolean format = validate_task_format(Object,Object);
  expect(format.toBe(false));
});

//lengths are same key 2 doesn't include key
test('both objects', () => {
  boolean format = validate_task_format(Object,Object);
  expect(format.toBe(false));
});

//lengths are same key 2 includes key
test('both objects', () => {
  boolean format = validate_task_format(Object,Object);
  expect(format.toBe(false));
});

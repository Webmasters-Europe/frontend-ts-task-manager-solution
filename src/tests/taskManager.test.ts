/*
This is a test file for the `taskManager` module. It is designed to test the core functionality that you have implemented in the `taskManager.ts` module.

IMPORTANT:
- DO NOT MODIFY this file.
- After implementing the `taskManager` module, you should be able to run this file by using the command `npm run ts-build`. 
- Once the project is built, open the `index.html` file located in the `assets` folder in your browser to see the output of the test cases in the browser's console.

The test file will:
- Add tasks.
- Update task statuses and priorities.
- Delete tasks.
- Fetch tasks based on their status.
- Find overdue tasks.
- Test edge cases, such as updating or deleting non-existing tasks.

EXPECTED BEHAVIOR:
- This file should run successfully without any modifications.
- Ensure that your implementation in the `taskManager.ts` module meets the requirements of these tests.

DO NOT MODIFY this file. You should aim to pass all the tests provided here by only working on the `taskManager.ts` module.
*/

import {
  tasks,
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  findOverdueTasks,
} from '../taskManager';

// ===== 1. Adding tasks =====
console.warn('=== Adding Tasks ===');
const task1 = addTask(
  'Task 1',
  'high',
  '2024-10-10',
  'This is a high priority task.'
);
console.log('Added Task 1 (ID should be 1):');
console.log(task1);

const task2 = addTask('Task 2', 'medium', '2024-10-15');
console.log('Added Task 2 (ID should be 2):');
console.log(task2);

const task3 = addTask(
  'Task 3',
  'low',
  '2024-09-30',
  'Low priority task, overdue.'
);
console.log('Added Task 3 (ID should be 3):');
console.log(task3);

const task4 = addTask(
  'Task 4',
  'high',
  '2024-12-01',
  'Upcoming high priority task.'
);
console.log('Added Task 4 (ID should be 4):');
console.log(task4);

const task5 = addTask('Task 5', 'medium', '2024-09-25', 'Overdue medium task.');
console.log('Added Task 5 (ID should be 5):');
console.log(task5);

// ===== 2. Fetching all tasks =====
console.warn('=== Fetching All Tasks ===');
console.log('Expecting 5 tasks:');
console.log(getTasks());

// ===== 3. Updating a task's status and priority =====
console.warn('=== Updating Task 1 Status and Priority ===');
const updatedTask1 = updateTask(task1.id, 'in-progress', 'medium');
console.log(
  'Updated Task 1 (status should be "in-progress", priority should be "medium"):'
);
console.log(updatedTask1);

console.warn('=== Updating Task 3 to Completed ===');
const updatedTask3 = updateTask(task3.id, 'completed');
console.log('Updated Task 3 (status should be "completed"):');
console.log(updatedTask3);

// ===== 4. Deleting a task =====
console.warn('=== Deleting Task 2 ===');
const isDeleted = deleteTask(task2.id);
console.log('Task 2 deleted (should return true):');
console.log(isDeleted);
console.log(
  'Fetching all tasks after deletion (Task 2 should no longer be in the list):'
);
console.log(getTasks());

// ===== 5. Fetching tasks with a specific status =====
console.warn('=== Fetching In-progress Tasks ===');
console.log('Expecting 1 in-progress task (Task 1):');
console.log(getTasks('in-progress'));

// ===== 6. Fetching overdue tasks =====
console.warn('=== Fetching Overdue Tasks ===');
console.log('Expecting 2 overdue tasks (Task 3, Task 5):');
console.log(findOverdueTasks());

// ===== 7. Edge Case: Updating a task that doesn't exist =====
console.warn('=== Attempting to Update a Non-existing Task ===');
const updateNonExistingTask = updateTask(999, 'completed');
console.log('Trying to update non-existing task (should return undefined):');
console.log(updateNonExistingTask);

// ===== 8. Edge Case: Deleting a task that doesn't exist =====
console.warn('=== Attempting to Delete a Non-existing Task ===');
const deleteNonExistingTask = deleteTask(999);
console.log('Trying to delete non-existing task (should return false):');
console.log(deleteNonExistingTask);

// ===== 9. Adding and Fetching Tasks After Deletion =====
console.warn('=== Adding a New Task After Deletion ===');
const task6 = addTask('Task 6', 'low', '2024-11-05');
console.log('Added Task 6 (ID should be 6):');
console.log(task6);

console.warn('=== Fetching All Tasks After Adding Task 6 ===');
console.log('Expecting 5 tasks (Task 6 should be added):');
console.log(getTasks());

// ===== 10. Verifying if Task IDs are auto-incremented correctly =====
console.warn('=== Verifying Task ID Continuity ===');
console.log('Task 6 ID (should be 6):');
console.log(task6.id);
console.log('All Task IDs (should be [1, 3, 4, 5, 6]):');
console.log(tasks.map((t) => t.id));

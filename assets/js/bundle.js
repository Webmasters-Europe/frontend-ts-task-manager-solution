(() => {
  // src/taskManager.ts
  var tasks = [];
  var nextTaskId = 1;
  function generateTaskId() {
    return nextTaskId++;
  }
  function addTask(title, priority, dueDate, description) {
    const newTask = {
      id: generateTaskId(),
      title,
      description,
      status: "not-started",
      // default status
      priority,
      dueDate
    };
    tasks.push(newTask);
    return newTask;
  }
  function updateTask(id, status, priority) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      if (status) {
        task.status = status;
      }
      if (priority) {
        task.priority = priority;
      }
      return task;
    }
    return void 0;
  }
  function deleteTask(id) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
  function getTasks(status) {
    if (status) {
      return tasks.filter((t) => t.status === status);
    }
    return tasks;
  }
  function findOverdueTasks() {
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    return tasks.filter(
      (t) => t.dueDate < currentDate && t.status !== "completed"
    );
  }

  // src/tests/taskManager.test.ts
  console.warn("=== Adding Tasks ===");
  var task1 = addTask(
    "Task 1",
    "high",
    "2024-10-10",
    "This is a high priority task."
  );
  console.log("Added Task 1 (ID should be 1):");
  console.log(task1);
  var task2 = addTask("Task 2", "medium", "2024-10-15");
  console.log("Added Task 2 (ID should be 2):");
  console.log(task2);
  var task3 = addTask(
    "Task 3",
    "low",
    "2024-09-30",
    "Low priority task, overdue."
  );
  console.log("Added Task 3 (ID should be 3):");
  console.log(task3);
  var task4 = addTask(
    "Task 4",
    "high",
    "2024-12-01",
    "Upcoming high priority task."
  );
  console.log("Added Task 4 (ID should be 4):");
  console.log(task4);
  var task5 = addTask("Task 5", "medium", "2024-09-25", "Overdue medium task.");
  console.log("Added Task 5 (ID should be 5):");
  console.log(task5);
  console.warn("=== Fetching All Tasks ===");
  console.log("Expecting 5 tasks:");
  console.log(getTasks());
  console.warn("=== Updating Task 1 Status and Priority ===");
  var updatedTask1 = updateTask(task1.id, "in-progress", "medium");
  console.log(
    'Updated Task 1 (status should be "in-progress", priority should be "medium"):'
  );
  console.log(updatedTask1);
  console.warn("=== Updating Task 3 to Completed ===");
  var updatedTask3 = updateTask(task3.id, "completed");
  console.log('Updated Task 3 (status should be "completed"):');
  console.log(updatedTask3);
  console.warn("=== Deleting Task 2 ===");
  var isDeleted = deleteTask(task2.id);
  console.log("Task 2 deleted (should return true):");
  console.log(isDeleted);
  console.log(
    "Fetching all tasks after deletion (Task 2 should no longer be in the list):"
  );
  console.log(getTasks());
  console.warn("=== Fetching In-progress Tasks ===");
  console.log("Expecting 1 in-progress task (Task 1):");
  console.log(getTasks("in-progress"));
  console.warn("=== Fetching Overdue Tasks ===");
  console.log("Expecting 2 overdue tasks (Task 3, Task 5):");
  console.log(findOverdueTasks());
  console.warn("=== Attempting to Update a Non-existing Task ===");
  var updateNonExistingTask = updateTask(999, "completed");
  console.log("Trying to update non-existing task (should return undefined):");
  console.log(updateNonExistingTask);
  console.warn("=== Attempting to Delete a Non-existing Task ===");
  var deleteNonExistingTask = deleteTask(999);
  console.log("Trying to delete non-existing task (should return false):");
  console.log(deleteNonExistingTask);
  console.warn("=== Adding a New Task After Deletion ===");
  var task6 = addTask("Task 6", "low", "2024-11-05");
  console.log("Added Task 6 (ID should be 6):");
  console.log(task6);
  console.warn("=== Fetching All Tasks After Adding Task 6 ===");
  console.log("Expecting 5 tasks (Task 6 should be added):");
  console.log(getTasks());
  console.warn("=== Verifying Task ID Continuity ===");
  console.log("Task 6 ID (should be 6):");
  console.log(task6.id);
  console.log("All Task IDs (should be [1, 3, 4, 5, 6]):");
  console.log(tasks.map((t) => t.id));
})();

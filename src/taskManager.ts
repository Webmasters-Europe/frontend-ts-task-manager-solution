interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

let tasks: Task[] = []; // Array to store tasks
let nextTaskId = 1; // Initialize the task ID counter

function generateTaskId(): number {
  return nextTaskId++;
}

// Add a new task
function addTask(
  title: string,
  priority: 'low' | 'medium' | 'high',
  dueDate: string,
  description?: string
): Task {
  const newTask: Task = {
    id: generateTaskId(),
    title,
    description,
    status: 'not-started', // default status
    priority,
    dueDate,
  };

  tasks.push(newTask);

  return newTask;
}

// Update a task's status and/or priority
function updateTask(
  id: number,
  status?: 'not-started' | 'in-progress' | 'completed',
  priority?: 'low' | 'medium' | 'high'
): Task | undefined {
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

  return undefined;
}

// Delete a task by its ID
function deleteTask(id: number): boolean {
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }

  return false;
}

// Fetch all tasks or filter by status
function getTasks(
  status?: 'not-started' | 'in-progress' | 'completed'
): Task[] {
  if (status) {
    return tasks.filter((t) => t.status === status);
  }

  return tasks;
}

// Find overdue tasks
function findOverdueTasks(): Task[] {
  const currentDate = new Date().toISOString().split('T')[0]; // current date in YYYY-MM-DD format

  return tasks.filter(
    (t) => t.dueDate < currentDate && t.status !== 'completed'
  );
}

export { tasks, addTask, updateTask, deleteTask, getTasks, findOverdueTasks };

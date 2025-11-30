import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService
} from "./task.service.js";

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const { title, description, dueDate,priority } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

   
    console.log("CREATE TASK USER:", req.user);

    const task = await createTaskService(
      userId,
      title,
      description,
      dueDate,
      priority,
    );

    res.json(task);
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

   
    const tasks = await getTasksService(userId);
    res.json(tasks);

  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};


export const updateTask = async (req, res) => {
  try {

    const userId = req.user.id;
    const taskId = req.params.id;

    const result = await updateTaskService(taskId, userId,  req.body);
    res.json(result);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const taskId = req.params.id;

    const result = await deleteTaskService(taskId, userId, );
    res.json(result);
  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

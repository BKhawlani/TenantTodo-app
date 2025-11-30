import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Create Task
 */
export const createTaskService = async (
  userId,
  title,
  description,
  dueDate,
  priority,
  
) => {
  return prisma.task.create({
    data: {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: "pending",
      priority: priority || "normal",
      userId,
    }
  });
};

/**
 */
export const getTasksService = async (userId) => {
 
    return prisma.task.findMany({
      where: { userId }
    });
  

  return prisma.task.findMany({
    where: { userId }
  });
};


/**
 * Update task
 */
export const updateTaskService = async (taskId, userId, data) => {

  
    return prisma.task.update({
      where: { id: taskId },
      data
    });
  

 
};




/**
 * Delete task
 */
export const deleteTaskService = async (taskId, userId) => {
  const where =
    
       { id: taskId, userId }
     
  return prisma.task.deleteMany({ where });
};

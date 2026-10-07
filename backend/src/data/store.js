import { v4 as uuidv4 } from 'uuid';

const tasks = new Map();

const seedTasks = [
    { id: uuidv4(), title: 'Setup project repository', description: 'Initialize Git repo and project structure', status: 'completed', priority: 'high', dueDate: new Date(Date.now() - 86400000).toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Implement Authentication', description: 'Setup JWT authentication', status: 'in_progress', priority: 'high', dueDate: new Date(Date.now() + 86400000).toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Design database schema', description: 'Create ERD and initial models', status: 'completed', priority: 'medium', dueDate: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Write unit tests', description: 'Implement tests for user service', status: 'pending', priority: 'medium', dueDate: new Date(Date.now() + 172800000).toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions', status: 'pending', priority: 'high', dueDate: new Date(Date.now() + 259200000).toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Update documentation', description: 'Write API docs and README', status: 'pending', priority: 'low', dueDate: new Date(Date.now() + 345600000).toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

seedTasks.forEach(task => tasks.set(task.id, task));

export const getAllTasks = () => Array.from(tasks.values());

export const getTaskById = (id) => tasks.get(id);

export const createTask = (taskData) => {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newTask = {
        id,
        ...taskData,
        createdAt: now,
        updatedAt: now
    };
    tasks.set(id, newTask);
    return newTask;
};

export const updateTask = (id, taskData) => {
    if (!tasks.has(id)) return null;
    const existingTask = tasks.get(id);
    const updatedTask = {
        ...existingTask,
        ...taskData,
        updatedAt: new Date().toISOString()
    };
    tasks.set(id, updatedTask);
    return updatedTask;
};

export const deleteTask = (id) => {
    return tasks.delete(id);
};

export const getTaskStats = () => {
    const allTasks = Array.from(tasks.values());
    const stats = {
        total: allTasks.length,
        pending: 0,
        inProgress: 0,
        completed: 0,
        highPriority: 0,
        overdue: 0
    };
    const now = new Date();

    allTasks.forEach(t => {
        if (t.status === 'pending') stats.pending++;
        if (t.status === 'in_progress') stats.inProgress++;
        if (t.status === 'completed') stats.completed++;
        if (t.priority === 'high') stats.highPriority++;
        if (t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed') stats.overdue++;
    });

    return stats;
};

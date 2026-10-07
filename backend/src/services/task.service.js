import * as store from '../data/store.js';

export const getAllTasks = (query = {}) => {
    let tasks = store.getAllTasks();

    if (query.search) {
        const term = query.search.toLowerCase();
        tasks = tasks.filter(t => t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term));
    }

    if (query.status) {
        tasks = tasks.filter(t => t.status === query.status);
    }

    if (query.priority) {
        tasks = tasks.filter(t => t.priority === query.priority);
    }

    if (query.sortBy) {
        const order = query.sortOrder === 'desc' ? -1 : 1;
        tasks.sort((a, b) => {
            if (a[query.sortBy] < b[query.sortBy]) return -1 * order;
            if (a[query.sortBy] > b[query.sortBy]) return 1 * order;
            return 0;
        });
    } else {
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const total = tasks.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedTasks = tasks.slice(startIndex, endIndex);

    return {
        tasks: paginatedTasks,
        pagination: { page, limit, total, totalPages }
    };
};

export const getTaskById = (id) => store.getTaskById(id);

export const createTask = (data) => {
    const taskData = {
        ...data,
        status: data.status || 'pending',
        priority: data.priority || 'medium'
    };
    return store.createTask(taskData);
};

export const updateTask = (id, data) => store.updateTask(id, data);

export const deleteTask = (id) => store.deleteTask(id);

export const getTaskStats = () => store.getTaskStats();

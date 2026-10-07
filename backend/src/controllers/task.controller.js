import * as taskService from '../services/task.service.js';
import { validateCreateTask, validateUpdateTask } from '../validators/task.validator.js';

export const getAllTasks = async (req, res, next) => {
    try {
        const result = taskService.getAllTasks(req.query);
        res.status(200).json({ success: true, data: result.tasks, pagination: result.pagination });
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const task = taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const validation = validateCreateTask(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }
        const task = taskService.createTask(req.body);
        res.status(201).json({ success: true, data: task, message: 'Task created successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const validation = validateUpdateTask(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }
        const task = taskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task, message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const success = taskService.deleteTask(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getTaskStats = async (req, res, next) => {
    try {
        const stats = taskService.getTaskStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

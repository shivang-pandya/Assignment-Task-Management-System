export const validateCreateTask = (data) => {
    const errors = [];
    
    if (!data.title || data.title.length < 3 || data.title.length > 100) {
        errors.push('Title is required and must be between 3 and 100 characters.');
    }
    
    if (!data.description || data.description.length < 3 || data.description.length > 500) {
        errors.push('Description is required and must be between 3 and 500 characters.');
    }

    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (data.status && !validStatuses.includes(data.status)) {
        errors.push('Status must be pending, in_progress, or completed.');
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (data.priority && !validPriorities.includes(data.priority)) {
        errors.push('Priority must be low, medium, or high.');
    }

    if (data.dueDate && isNaN(Date.parse(data.dueDate))) {
        errors.push('Due date must be a valid date string.');
    }

    return { isValid: errors.length === 0, errors };
};

export const validateUpdateTask = (data) => {
    const errors = [];
    
    if (!data || Object.keys(data).length === 0) {
        errors.push('At least one field is required for update.');
        return { isValid: false, errors };
    }

    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.length < 3 || data.title.length > 100)) {
        errors.push('Title must be between 3 and 100 characters.');
    }
    
    if (data.description !== undefined && (typeof data.description !== 'string' || data.description.length < 3 || data.description.length > 500)) {
        errors.push('Description must be between 3 and 500 characters.');
    }

    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (data.status !== undefined && !validStatuses.includes(data.status)) {
        errors.push('Status must be pending, in_progress, or completed.');
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (data.priority !== undefined && !validPriorities.includes(data.priority)) {
        errors.push('Priority must be low, medium, or high.');
    }

    if (data.dueDate !== undefined && isNaN(Date.parse(data.dueDate))) {
        errors.push('Due date must be a valid date string.');
    }

    return { isValid: errors.length === 0, errors };
};

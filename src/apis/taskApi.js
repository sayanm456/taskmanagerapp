const API_URL = `${process.env.SERVER_HOST}:${process.env.PORT}`


export const createTask = async (title, description, due_date, status, priority, assigned_user) => {

    const response = await fetch(`${API_URL}/api/tasks/createtask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify({ title, description, due_date, status, priority, assigned_user })
    })
    return response.json();
}

export const updateTask = async (id, title, description, due_date, status, priority) => {
    
    const response = await fetch(`${API_URL}/api/tasks/updatetask/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify({ title, description, due_date, status, priority })
    })
    return response.json();
}

export const deleteTask = async (id) => {
    
    const response = await fetch(`${API_URL}/api/tasks/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}

export const getTasks = async (query) => {
    
    const response = await fetch(`${API_URL}/api/tasks/getalltasks?${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}

export const getTaskSummary = async (query) => {

    const response = await fetch(`${API_URL}/api/tasks/tasksummary?${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}
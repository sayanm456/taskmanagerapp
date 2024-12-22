// const SERVER_HOST = "http://127.0.0.1"
// const PORT = "3000"
// const API_URL = `${SERVER_HOST}:${PORT}`
const API_URL = `${process.env.SERVER_HOST}:${process.env.PORT}`


export const CreateTask = async (title, description, due_date, status, priority, assigned_user) => {

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

export const UpdateTask = async (id, title, description, due_date, status, priority) => {
    
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

export const DeleteTask = async (id) => {
    
    const response = await fetch(`${API_URL}/api/tasks/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}

export const GetTasks = async (query) => {
    
    const response = await fetch(`${API_URL}/api/tasks/getalltasks?${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}

export const GetTaskSummary = async (query) => {

    const response = await fetch(`${API_URL}/api/tasks/tasksummary?${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}
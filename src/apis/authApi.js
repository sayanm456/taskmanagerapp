// const { SERVER_HOST, PORT } = window.env ;
const SERVER_HOST="http://127.0.0.1"
const PORT = "8000"


const API_URL = `${SERVER_HOST}:${PORT}`


export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return response.json();
}


export const registerUser = async (userdetails) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdetails)
    })
    return response.json();
}

export const getAllTasks = async (token) => {
    const response = await fetch(`${API_URL}/api/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    })
    return response.json();
}
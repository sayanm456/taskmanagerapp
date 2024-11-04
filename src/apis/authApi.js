const API_URL = `${process.env.SERVER_HOST}${process.env.PORT}`


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


export const registerUser = async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
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
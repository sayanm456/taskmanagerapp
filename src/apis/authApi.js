const API_URL = `${process.env.SERVER_HOST}:${process.env.PORT}`


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

export const getallUsers = async () => {
    const response = await fetch(`${API_URL}/api/auth/getusers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}
// const SERVER_HOST = "http://127.0.0.1"
// const PORT = "3000"
// const API_URL = `${SERVER_HOST}:${PORT}`
const API_URL = `${process.env.SERVER_HOST}:${process.env.PORT}`
 


export const LoginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return response.json();
}


export const RegisterUser = async (userdetails) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdetails)
    })
    return response.json();
}

export const GetallUsers = async () => {
    const response = await fetch(`${API_URL}/api/auth/getusers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        }
    })
    return response.json();
}
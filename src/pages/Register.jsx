import React, { useState } from 'react'
import { registerUser } from '../apis/authApi'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", role: "user" })
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const resetForm = ()=>{
    setCredentials({ name: "", email: "", password: "", cpassword: "", role: "user" });
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, cpassword, role } = credentials;

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    else {
      const response = await registerUser({ name, email, password, role });
      console.log(response);
      if (response.success) {
        alert("User registered successfully");
        localStorage.setItem('token', response.authtoken);
        resetForm();
        navigate('/login');
      }
      else{
        alert("Invalid Credentials");
      }
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-80 py-10 flex flex-auto flex-wrap items-center">
          <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h1 className="text-gray-900 text-lg font-medium title-font mb-5 self-center">Register Now!</h1>
            <div className="relative mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-600">Full Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-600">Email ID</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} minLength={6} required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="cpassword" className="block text-sm font-bold mb-2 text-gray-600">Confirm Password</label>
              <input type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} minLength={6} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-600">Role</label>
              <select name='role' className="border border-gray-300 p-2 rounded w-full" onChange={onChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
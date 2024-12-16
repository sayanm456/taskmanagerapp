import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/auth/AuthContext'

const Signup = () => {

  const {signupUser} = useContext(AuthContext);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", role: "user" })
  const [message, setMessage] = useState({})

  const resetForm = () => {
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
      const credentialsJson = await signupUser({name, email, password, role});
      if(credentialsJson.success){
        alert(credentialsJson.message)
        setMessage(credentialsJson.message)
        resetForm()
        localStorage.setItem('authtoken', credentialsJson.authtoken)
        navigate(credentials.role === 'admin' ? "/admindash" : "/userdash")

      }
      else{
        alert(credentialsJson.message)
        setMessage(credentialsJson.message)
        resetForm()
      }
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <section className="text-gray-600 body-font font-medium">
        <div className="container px-80 pt-10 flex flex-auto flex-wrap items-center">
          <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h1 className="text-gray-900 text-3xl font-bold title-font mb-5 self-center">Register Now!</h1>
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
            {/* {credentials.password.length<6 && <h5 className='text-sm pt-2 text-center drop-shadow-sm'>Maximum lenth greater than 6</h5>} */}
            {credentials.password !== credentials.cpassword && <small className='text-sm pt-2 p-2 text-left text-red-600'>Password's Does not matched</small>}

            <div className="relative mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-600">Role</label>
              <select name='role' className=" font-bold border border-gray-300 p-2 rounded w-full" onChange={onChange} required>
                <option value="">--Select--</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
          </form>
        </div>
        <h5 className='text-sm pt-2 text-center drop-shadow-sm'>Already registerd? <a href="/login" className='ml-1'>click here to login!</a></h5>
      </section>
    </>
  )
}

export default Signup
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/auth/AuthContext';


const Login = () => {

  const { loginUser } = useContext(AuthContext);

  const [ userdetails, setUserdetails ] = useState({ email: "", password: "", role: "user" })

  const resetForm = () => {
    setUserdetails({ email: "", password: "", role: "user" });
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const { email, password, role } = userdetails;

    const userdetailsJson = await loginUser({email, password, role});
    if (userdetailsJson.success) {
      alert(userdetailsJson.message);
      localStorage.setItem('authtoken', userdetailsJson.authtoken);
      resetForm();
      navigate(userdetails.role === 'admin' ? "/admindash" : "/userdash");
    }
    else {
      alert(userdetailsJson.message);
      resetForm();
    }
  }

  const handleChange = (e) => {
    setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
  }

  return (
    <>
      <section className="text-gray-600 body-font font-medium">
        <div className="container px-80 pt-10 flex flex-auto flex-wrap items-center mt-10">
          <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h1 className="text-gray-900 text-3xl font-bold title-font mb-5 self-center">Login Now!</h1>
            <div className="relative mb-4">
              <label htmlFor="email" className="block text-base/7 font-bold mb-2 text-gray-600">Email ID</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="block text-base/7 font-bold mb-2 text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} minLength={6} required />
            </div>
            <div className="mb-4">
              <label className="block text-base/7 font-bold mb-2 text-gray-600">Role</label>
              <select name='role' className="font-bold border border-gray-300 p-2 rounded w-full" onChange={handleChange} required>
                <option value="">--Select--</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-500 rounded text-sm">Login</button>
          </form>
        </div>
        <h5 className='text-sm mt-4 text-center drop-shadow-sm '>Are you not registerd?<a href="/signup" className='ml-1'>click here to signup!</a></h5>
      </section>
    </>
  )
}

export default Login
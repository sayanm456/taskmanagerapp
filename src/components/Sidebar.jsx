import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  let location = useLocation();

  useEffect(() => {
     console.log(location);
  }, [location])
  return (
    <div
      className="flex h-screen max-h-[120vh] w-full max-w-[19rem] flex-col rounded-xl bg-white font bg-clip-border p-4 text-gray-700 shadow-xl shadow-black sticky">
      <div className="flex items-center gap-6 p-4 mb-2">
        <h5 className="block font-sans text-xl antialiased font-bold leading-snug tracking-normal text-black">
          ProWork App
        </h5>
      </div>
      <hr className="my-2 border-gray-50"/>
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base text-gray-500">
        <div className="relative block w-full">
          <div role="button"
            className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-gray-800 focus:bg-opacity-80 focus:text-gray-700 active:bg-gray-50 active:bg-opacity-80 active:text-gray-500">
            <button type="button"
              className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased leading-snug text-left transition-colors border-b-0 select-none border-b-gray-100 text-gray-700 hover:text-gray-900">
              <p className="block mr-auto font-sans text-base antialiased font-semi font-semibold leading-relaxed text-black hover:text-white">
                <Link to={"/"}>Home</Link> 
              </p>
            </button>
          </div>
        </div>
        <div className="relative block w-full">
          <div role="button" className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-gray-800 focus:bg-opacity-80 focus:text-gray-700 active:bg-gray-50 active:bg-opacity-80 active:text-gray-500">
            <button type="button" className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-gray-100 text-gray-700 hover:text-gray-900">
              <p className="block mr-auto font-sans text-base antialiased font-semibold leading-relaxed text-black hover:text-white">
                <Link to={"/admindash"}>Dashboard</Link> 
              </p>
            </button>
          </div>
        </div>
        <div role="button"
          className="flex items-center w-full p-3 leading-tight font-semibold transition-all rounded-lg outline-none text-start text-black hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-gray-800 focus:bg-opacity-80 focus:text-gray-700 active:bg-gray-50 active:bg-opacity-80 active:text-black">
          Inbox
        </div>
        <div role="button" className="flex items-center w-full p-3 leading-tight font-semibold transition-all rounded-lg outline-none text-start text-black hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-gray-800 focus:bg-opacity-80 focus:text-gray-700 active:bg-gray-50 active:bg-opacity-80 active:text-black">
          Profile
        </div>
        <div role="button">
          <Link className={`flex items-center w-full p-3 leading-tight font-semibold transition-all rounded-lg outline-none text-start text-black hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-black focus:bg-opacity-80 focus:text-white ${location.pathname==='/signup' ? "active:bg-gray-950 active:bg-opacity-100 active:text-white active:outline-none": ""}`} to={"/signup"}>Register</Link>
        </div>
        <div role="button">
          <Link className={`flex items-center w-full p-3 leading-tight font-semibold transition-all rounded-lg outline-none text-start text-black hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-black focus:bg-opacity-80 focus:text-white ${location.pathname==='/login' ? "active:bg-gray-950 active:bg-opacity-100 active:text-white active:outline-none": ""}`} to={"/login"}>Login</Link>
        </div>
        <div role="button" className="flex items-center w-full p-3 leading-tight font-semibold transition-all rounded-lg outline-none text-start text-black hover:bg-gray-900  hover:text-white hover:outline-none focus:bg-gray-800 focus:bg-opacity-80 focus:text-gray-700 active:bg-gray-50 active:bg-opacity-80 active:text-gray-500">
          Log Out
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
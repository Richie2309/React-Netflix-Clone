import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Signup() {
  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, signUp } = UserAuth()
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {               
      await signUp(email, password)
      navigate('/')
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <>
      <div className='w-full h-screen'>
        <img
          className=' sm:black absolute w-full h-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_small.jpg" alt="" />


        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />

        <div className='fixed w-full px-4 py-24 z-20'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/60 rounded-lg'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-nsans-bold'>Sign up</h1>

              <form onSubmit={handleFormSubmit} className='w-full flex flex-col py-4'>
                <input
                  className='p-3 my-2 bg-gray-950 rounded border border-gray-300 border-opacity-50'
                  placeholder='Email'
                  autoComplete='email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className='p-3 my-2 bg-gray-950 rounded border border-gray-300 border-opacity-50'
                  placeholder='Password'
                  autoComplete='current-password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className='bg-red-600 py-3 my-6 rounded font-nsans-bold'>
                  Sign Up
                </button>

                <div className='flex justify-between items-center text-white-600'>
                  <p>
                    <input type="checkbox" className='mr-2'
                      checked={rememberLogin} onChange={(e) => setRememberLogin(!rememberLogin)}
                    />
                    Remember me
                  </p>
                  <p>Need help?</p>
                </div>
                <p className="my-4">
                  <span className='text-gray-400 mr-2'>Already suscribed to Netflix? </span>
                  <Link to='/signin'>Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
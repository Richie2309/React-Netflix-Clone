import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import Signup from './pages/Signup'
import { UserAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute.'


function App() {
  const { user } = UserAuth();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={user?<Home/>:<Signin />} />
        <Route path='/signup' element={user?<Home/>:<Signup />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App

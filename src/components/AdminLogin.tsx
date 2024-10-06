import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace 'admin@example.com' with your actual admin email
    if (email === 'admin@example.com') {
      setIsLoggedIn(true)
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin/blog')
    } else {
      alert('Invalid admin email')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isAdmin')
    navigate('/')
  }

  if (isLoggedIn) {
    return (
      <div className="mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin} className="mb-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin Email"
        className="border rounded px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login as Admin
      </button>
    </form>
  )
}

export default AdminLogin
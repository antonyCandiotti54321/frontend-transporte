// src/App.jsx
import { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleLogin = (newToken) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return token
    ? <Dashboard token={token} onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />
}

export default App

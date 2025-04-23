// src/App.jsx
import { useState, useEffect } from 'react'
import Login from './Login'

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

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Token actual: <code>{token.slice(0, 30)}...</code></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App

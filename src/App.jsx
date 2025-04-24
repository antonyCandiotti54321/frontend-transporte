import { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import CrearUsuario from './CrearUsuario'

function App() {
  const [token, setToken] = useState(null)
  const [view, setView] = useState('dashboard')

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) setToken(savedToken)
  }, [])

  const handleLogin = (newToken) => setToken(newToken)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setView('dashboard')
  }

  if (!token) return <Login onLogin={handleLogin} />

  return view === 'crear'
    ? <CrearUsuario token={token} onInicio={() => setView('dashboard')} />
    : <Dashboard token={token} onLogout={handleLogout} onCrearUsuario={() => setView('crear')} />
}

export default App

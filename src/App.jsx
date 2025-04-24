import { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import CrearUsuario from './CrearUsuario'
import Descuentos from './Descuentos'
import DescuentoTotal from './DescuentoTotal'

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

  switch (view) {
    case 'crear':
      return <CrearUsuario token={token} onInicio={() => setView('dashboard')} />
    case 'descuentos':
      return <Descuentos onInicio={() => setView('dashboard')} />
    case 'descuentoTotal':
      return <DescuentoTotal onInicio={() => setView('dashboard')} />
    default:
      return (
        <Dashboard
          token={token}
          onLogout={handleLogout}
          onCrearUsuario={() => setView('crear')}
          onDescuentos={() => setView('descuentos')}
          onDescuentoTotal={() => setView('descuentoTotal')} // Pasamos la función aquí
        />
      )
  }
}

export default App

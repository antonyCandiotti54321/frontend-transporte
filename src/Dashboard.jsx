// src/Dashboard.jsx
import { useEffect, useState } from 'react'

function Dashboard({ token, onLogout }) {
  // Leer nombre y role desde localStorage
  const [nombre, setNombre] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    setNombre(localStorage.getItem('nombreCompleto') || '')
    setRole(localStorage.getItem('role') || '')
  }, [])

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Transporte</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.link}>Inicio</a>
  
          {role === 'CHOFER' && (
            <a href="#" style={styles.link}>Descuentos</a>
          )}
  
          {role === 'ADMIN' && (
            <>
              <a href="#" style={styles.link}>Crear usuario</a>
              <a href="#" style={styles.link}>Descuento total</a>
            </>
          )}
        </nav>
        <button style={styles.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
      </aside>
      <main style={styles.content}>
        <h1>Bienvenido, {nombre}!</h1>
        <h3>Rol: {role}</h3>
        <p>Token: <code>{token.slice(0, 30)}...</code></p>
      </main>
    </div>
  )
  
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  logo: {
    marginBottom: '2rem',
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  logout: {
    backgroundColor: '#e94560',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: '2rem',
  },
}

export default Dashboard

// src/Dashboard.jsx
import { useEffect, useState } from 'react'

function Dashboard({ token, onLogout, onCrearUsuario }) {
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
              <button onClick={onCrearUsuario} style={styles.linkButton}>Crear usuario</button>
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
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#16213e',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textAlign: 'center',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  logout: {
    marginTop: 'auto',
    padding: '0.5rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  content: {
    flex: 1,
    padding: '2rem',
  }
}

export default Dashboard

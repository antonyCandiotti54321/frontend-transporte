import { useEffect, useState } from 'react'

function Dashboard({ token, onLogout, onCrearUsuario, onDescuentos }) {
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
            <button onClick={onDescuentos} style={styles.link}>Descuentos</button> // 🆕
          )}
          {role === 'ADMIN' && (
            <>
              <button onClick={onCrearUsuario} style={styles.link}>Crear usuario</button>
              <a href="#" style={styles.link}>Descuento total</a>
            </>
          )}
        </nav>
        <button style={styles.logout} onClick={onLogout}>Cerrar sesión</button>
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
    padding: '1rem',
  },
  logo: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  nav: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    color: 'white',
    backgroundColor: '#16213e',
    border: 'none',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logout: {
    backgroundColor: '#e94560',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '2rem',
  },
}

export default Dashboard

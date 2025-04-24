import { useState } from 'react'

function CrearUsuario({ token }) {
  const [role, setRole] = useState('ADMIN')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let url = ''
      let body = {}

      if (role === 'EMPLEADO') {
        url = 'https://transporte-ecug.onrender.com/api/admin/register/empleado'
        body = { nombreCompleto }
      } else {
        url = 'https://transporte-ecug.onrender.com/api/admin/register'
        body = { username, password, nombreCompleto, role }
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      setMensaje(res.ok ? 'Usuario creado correctamente' : data.message || 'Error al crear usuario')
    } catch (err) {
      console.error(err.message)
      setMensaje('Error de red')
    }
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Transporte</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.link}>Inicio</a>
          <a href="#" style={styles.link}>Crear usuario</a>
        </nav>
      </aside>

      <main style={styles.content}>
        <h2>Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Rol:
            <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
              <option value="ADMIN">Admin</option>
              <option value="CHOFER">Chofer</option>
              <option value="EMPLEADO">Empleado</option>
            </select>
          </label>

          {(role !== 'EMPLEADO') && (
            <>
              <input placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            </>
          )}

          <input placeholder="Nombre completo" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required style={styles.input} />

          <button type="submit" style={styles.button}>Crear</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
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
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    color: 'white',
    backgroundColor: '#16213e',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  content: {
    flex: 1,
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#0f3460',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default CrearUsuario

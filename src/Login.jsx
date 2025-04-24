import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://transporte-ecug.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
      // Guardamos token, nombre, role e id
      localStorage.setItem('token', data.token)
      localStorage.setItem('nombreCompleto', data.nombreCompleto)
      localStorage.setItem('role', data.role)
      localStorage.setItem('id', data.id)

      // Llamamos a onLogin con el token
      onLogin(data.token)

    } catch (err) {
      console.error(err.message)
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',  // Asegura que el contenedor ocupe toda la pantalla
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
    width: '100vw',  // Asegura que ocupe todo el ancho de la ventana
    margin: 0,  // Asegura que no haya margen extra
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '2rem 3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto', // Esto asegura que el formulario se centre
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#1a1a2e',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1.1rem',
    backgroundColor: '#16213e',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#1a1a2e',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    textAlign: 'center',
  }
}

export default Login

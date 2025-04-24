import { useState } from 'react';

function CrearUsuario({ token, onInicio }) {
  const [role, setRole] = useState('ADMIN');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '';
      let body = {};

      if (role === 'EMPLEADO') {
        url = 'https://transporte-ecug.onrender.com/api/admin/register/empleado';
        body = { nombreCompleto };
      } else {
        url = 'https://transporte-ecug.onrender.com/api/admin/register';
        body = { username, password, nombreCompleto, role };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setMensaje(res.ok ? 'Usuario creado correctamente' : data.message || 'Error al crear usuario');
    } catch (err) {
      console.error(err.message);
      setMensaje('Error de red');
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Transporte</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.link} onClick={onInicio}>Inicio</a>
          <button onClick={onInicio} style={styles.link}>Crear Usuario</button>
        </nav>
        <button style={styles.logout} onClick={() => localStorage.clear()}>Cerrar sesión</button>
      </aside>

      <main style={styles.content}>
        <div style={styles.formWrapper}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Crear nuevo usuario</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                Rol:
                <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
                  <option value="ADMIN">Admin</option>
                  <option value="CHOFER">Chofer</option>
                  <option value="EMPLEADO">Empleado</option>
                </select>
              </label>

              {role !== 'EMPLEADO' && (
                <>
                  <input
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                  />
                </>
              )}
              <input
                placeholder="Nombre completo"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Crear</button>
            </form>
            {mensaje && <p style={styles.message}>{mensaje}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f0f2f5',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '2rem 3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    color: '#1a1a2e',
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
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#28a745',
  },
};

export default CrearUsuario;

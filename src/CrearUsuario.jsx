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
        <h2>Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <label>
            Rol:
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '0.75rem' }}>
              <option value="ADMIN">Admin</option>
              <option value="CHOFER">Chofer</option>
              <option value="EMPLEADO">Empleado</option>
            </select>
          </label>

          {(role !== 'EMPLEADO') && (
            <>
              <input
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <input
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
          />
          <button type="submit">Crear</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </main>
    </div>
  );
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
};

export default CrearUsuario;

import { useState, useEffect } from 'react';

function Descuentos({ onInicio }) {
  const [empleados, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState('');
  const [soles, setSoles] = useState('');
  const [mensajeDesc, setMensajeDesc] = useState('');
  const [feedback, setFeedback] = useState('');

  const token = localStorage.getItem('token');
  const idChofer = localStorage.getItem('id');
  const [imagenUrl] = useState('***************');

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await fetch('https://transporte-ecug.onrender.com/api/empleado', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEmpleados(data);
      } catch (err) {
        console.error('Error al obtener empleados:', err);
      }
    };

    fetchEmpleados();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idChofer) {
      setFeedback('No se encontró el ID del chofer. Inicia sesión de nuevo.');
      return;
    }

    try {
      const descuentoRequest = {
        idChofer: parseInt(idChofer, 10),
        idEmpleado: parseInt(idEmpleado, 10),
        soles: parseFloat(soles),
        mensaje: mensajeDesc,
        imagenUrl,             
      };

      const res = await fetch('https://transporte-ecug.onrender.com/api/chofer/descuentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(descuentoRequest),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback('Descuento creado correctamente');
        setIdEmpleado('');
        setSoles('');
        setMensajeDesc('');
      } else {
        setFeedback(data.message || 'Error al crear descuento');
      }
    } catch (err) {
      console.error('Error al crear descuento:', err);
      setFeedback('Error de red');
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Transporte</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.link} onClick={onInicio}>Inicio</a>
          <button onClick={onInicio} style={styles.link}>Descuentos</button>
        </nav>
        <button style={styles.logout} onClick={() => localStorage.clear()}>Cerrar sesión</button>
      </aside>

      <main style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Crear Descuento</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Empleado:
              <select
                value={idEmpleado}
                onChange={(e) => setIdEmpleado(e.target.value)}
                style={styles.input}
                required
              >
                <option value="">Selecciona un empleado</option>
                {empleados.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombreCompleto}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Monto (S/):
              <input
                type="number"
                value={soles}
                onChange={(e) => setSoles(e.target.value)}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Mensaje:
              <input
                type="text"
                value={mensajeDesc}
                onChange={(e) => setMensajeDesc(e.target.value)}
                style={styles.input}
                required
              />
            </label>

            <button type="submit" style={styles.button}>Crear Descuento</button>
          </form>

          {feedback && <p style={styles.feedback}>{feedback}</p>}
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '1rem',
    fontSize: '1.75rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontSize: '1.1rem',
    color: '#333',
  },
  input: {
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '0.5rem',
    outline: 'none',
    width: '100%',
  },
  button: {
    padding: '1rem',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#1a73e8', // Color que combina con el dashboard
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0f59b0',
  },
  feedback: {
    fontSize: '1rem',
    color: '#333',
    marginTop: '1rem',
  },
};

export default Descuentos;

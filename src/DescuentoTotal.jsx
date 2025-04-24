import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function DescuentoTotal({ onInicio }) {
  const [descuentosTotal, setDescuentosTotal] = useState([]);
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
  const [error, setError] = useState('');  // Para manejar errores

  // token de localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('Token:', token);

    const fetchDescuentoTotal = async () => {
      try {
        const res = await fetch('https://transporte-ecug.onrender.com/api/admin/descuentos/descuento-total', {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (!res.ok) {
          throw new Error('No se pudo obtener los descuentos. Estado: ' + res.status);
        }
    
        const data = await res.json();
        setDescuentosTotal(data);
      } catch (err) {
        setError('Error al obtener los descuentos totales: ' + err.message);  // Mostrar detalles del error
      } finally {
        setLoading(false);
      }
    };
    

    fetchDescuentoTotal();
  }, [token]);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Transporte</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.link} onClick={onInicio}>Inicio</a>
        </nav>
        <button style={styles.logout} onClick={onInicio}>Volver al Dashboard</button>
      </aside>

      <main style={styles.content}>
        <h1>Descuento Total</h1>

        {loading && <p>Cargando...</p>}  {/* Mostrar mensaje de carga mientras se obtiene la data */}
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar mensaje de error si ocurre algún problema */}

        {/* Mostrar los descuentos si los hay */}
        {!loading && !error && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>Empleado</th>
                <th style={styles.th}>Total en Soles</th>
              </tr>
            </thead>
            <tbody>
              {descuentosTotal.map((desc) => (
                <tr key={desc.idEmpleado}>
                  <td style={styles.td}>{desc.nombreEmpleado}</td>
                  <td style={styles.td}>{desc.totalSoles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
  th: {
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
};

export default DescuentoTotal;

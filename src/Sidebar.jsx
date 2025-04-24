// src/Sidebar.jsx
function Sidebar({ role, onLogout, onCrearUsuario }) {
    return (
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
    )
  }
  
  const styles = {
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
      textDecoration: 'none',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      padding: '0.5rem 0',
    },
    linkButton: {
      backgroundColor: '#2e2e4e',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      textAlign: 'left',
      cursor: 'pointer',
    },
    logout: {
      marginTop: 'auto',
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
    },
  }
  
  export default Sidebar
  
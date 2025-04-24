function Sidebar({ onInicio, onCrearUsuario, onVerUsuarios, onCerrarSesion }) {
    return (
      <aside style={sidebarStyle}>
        <h2 style={titleStyle}>Transporte</h2>
        <nav style={navStyle}>
          <button onClick={onInicio} style={buttonStyle}>Inicio</button>
          <button onClick={onCrearUsuario} style={buttonStyle}>Crear usuario</button>
          <button onClick={onVerUsuarios} style={buttonStyle}>Ver usuarios</button>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={onCerrarSesion} style={{ ...buttonStyle, backgroundColor: '#e94560' }}>Cerrar sesión</button>
        </div>
      </aside>
    )
  }
  
  const sidebarStyle = {
    width: '240px',
    backgroundColor: '#0f3460',
    color: 'white',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    borderRight: '1px solid #16213e'
  }
  
  const titleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    letterSpacing: '1px'
  }
  
  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
  
  const buttonStyle = {
    color: '#fff',
    backgroundColor: '#1a1a2e',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  }
  
  export default Sidebar
  
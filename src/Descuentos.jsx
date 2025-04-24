// src/Descuentos.jsx
import Sidebar from './Sidebar'

function Descuentos({ onInicio }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onInicio={onInicio} />
      <main style={{ flex: 1, padding: '2rem' }}>
        <h2>Página de Descuentos</h2>
        <p>Aquí se mostrarán los descuentos disponibles para los choferes.</p>
      </main>
    </div>
  )
}

export default Descuentos

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Descuentos({ onInicio }) {
  const [empleados, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState('');
  const [soles, setSoles] = useState('');
  const [mensajeDesc, setMensajeDesc] = useState('');
  const [feedback, setFeedback] = useState('');

  // token e idChofer de localStorage
  const token = localStorage.getItem('token');
  const idChofer = localStorage.getItem('id');

  // valor por defecto oculto para imagenUrl
  const [imagenUrl] = useState('***************');

  useEffect(() => {
    console.log('Token:', token);
    console.log('ID Chofer:', idChofer);

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
        imagenUrl,             // siempre envía '***************'
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
        // limpia formulario
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
    <div style={{ display: 'flex' }}>
      <Sidebar onInicio={onInicio} />
      <main style={{ flex: 1, padding: '2rem' }}>
        <h2>Crear Descuento</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <label>
            Empleado:
            <select
              value={idEmpleado}
              onChange={(e) => setIdEmpleado(e.target.value)}
              style={{ padding: '0.75rem' }}
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

          <label>
            Monto (S/):
            <input
              type="number"
              value={soles}
              onChange={(e) => setSoles(e.target.value)}
              required
            />
          </label>

          <label>
            Mensaje:
            <input
              type="text"
              value={mensajeDesc}
              onChange={(e) => setMensajeDesc(e.target.value)}
              required
            />
          </label>

          <button type="submit">Crear Descuento</button>
        </form>

        {feedback && <p>{feedback}</p>}
      </main>
    </div>
  );
}

export default Descuentos;

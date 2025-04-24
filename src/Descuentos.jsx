import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Descuentos({ onInicio }) {
  const [empleados, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState('');
  const [soles, setSoles] = useState('');
  const [mensajeDesc, setMensajeDesc] = useState('');     // Estado para el input de mensaje
  const [imagenUrl, setImagenUrl] = useState('');
  const [feedback, setFeedback] = useState('');           // Estado para el mensaje de respuesta

  const token = localStorage.getItem('token');
  const idChofer = localStorage.getItem('id');

  useEffect(() => {
    console.log('Token desde localStorage:', token);
    console.log('ID Chofer desde localStorage:', idChofer);

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
        idChofer: parseInt(idChofer),
        idEmpleado: parseInt(idEmpleado),
        soles: parseFloat(soles),
        mensaje: mensajeDesc,        // Uso del mensaje de input
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
        // Limpiar formulario
        setIdEmpleado('');
        setSoles('');
        setMensajeDesc('');
        setImagenUrl('');
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

          <label>
            URL de la imagen:
            <input
              type="text"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
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

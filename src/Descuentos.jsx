import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Descuentos({ onInicio }) {
  const [empleados, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState('');
  const [soles, setSoles] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  // Obtener token e idChofer desde localStorage
  const token = localStorage.getItem('token');
  const idChofer = localStorage.getItem('id');

  useEffect(() => {
    console.log('Token desde localStorage:', token);
    console.log('ID Chofer desde localStorage:', idChofer);

    const fetchEmpleados = async () => {
      try {
        const response = await fetch('https://transporte-ecug.onrender.com/api/empleado', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmpleados();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idChofer) {
      setMensaje('No se encontró el ID del chofer. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const descuentoRequest = {
        idChofer: parseInt(idChofer),
        idEmpleado,
        soles: parseFloat(soles),
        mensaje,
        imagenUrl,
      };

      const response = await fetch('https://transporte-ecug.onrender.com/api/chofer/descuentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(descuentoRequest),
      });

      const data = await response.json();
      setMensaje(response.ok ? 'Descuento creado correctamente' : data.message || 'Error al crear descuento');
    } catch (error) {
      console.error('Error al crear descuento:', error);
      setMensaje('Error de red');
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
            <select value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} style={{ padding: '0.75rem' }} required>
              <option value="">Selecciona un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado.id} value={empleado.id}>
                  {empleado.nombreCompleto}
                </option>
              ))}
            </select>
          </label>
          <label>
            Monto (S/):
            <input type="number" value={soles} onChange={(e) => setSoles(e.target.value)} required />
          </label>
          <label>
            Mensaje:
            <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required />
          </label>
          <label>
            URL de la imagen:
            <input type="text" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
          </label>
          <button type="submit">Crear Descuento</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </main>
    </div>
  );
}

export default Descuentos;

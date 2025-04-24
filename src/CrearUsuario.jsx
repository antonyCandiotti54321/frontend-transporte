// src/CrearUsuario.jsx
import { useState } from 'react'

function CrearUsuario({ token }) {
  const [role, setRole] = useState('ADMIN')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let url = ''
      let body = {}

      if (role === 'EMPLEADO') {
        url = 'https://transporte-ecug.onrender.com/api/admin/register/empleado'
        body = { nombreCompleto }
      } else {
        url = 'https://transporte-ecug.onrender.com/api/admin/register'
        body = {
          username,
          password,
          nombreCompleto,
          role
        }
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (res.ok) {
        setMensaje('Usuario creado correctamente')
      } else {
        setMensaje(data.message || 'Error al crear usuario')
      }
    } catch (err) {
        console.error(err.message)
      setMensaje('Error de red')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Crear nuevo usuario</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <label>
          Rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ADMIN">Admin</option>
            <option value="CHOFER">Chofer</option>
            <option value="EMPLEADO">Empleado</option>
          </select>
        </label>

        {(role !== 'EMPLEADO') && (
          <>
            <input placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </>
        )}

        <input placeholder="Nombre completo" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required />

        <button type="submit">Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default CrearUsuario

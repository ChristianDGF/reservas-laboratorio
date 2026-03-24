import React, { useState } from 'react';
import type { Reserva } from '../types';
import { reservasApi } from '../api/cliente';

interface HistorialPasadasProps {
    onVolver: () => void;
}

export const HistorialPasadas: React.FC<HistorialPasadasProps> = ({ onVolver }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBuscar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fechaInicio || !fechaFin) {
            setError('Por favor, selecciona ambas fechas.');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            // Llamada real a tu API en AWS para buscar por fechas
            const data = await reservasApi.obtenerPasadas(fechaInicio, fechaFin);
            setReservas(data || []);
        } catch (err: any) {
            setError(err.message || 'Error al buscar el historial');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Historial de Reservas</h2>
                <button
                    onClick={onVolver}
                    className="btn-secondary"
                >
                    Volver a Reservas Activas
                </button>
            </div>

            <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>Fecha Inicio:</label>
                    <input
                        type="datetime-local"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>Fecha Fin:</label>
                    <input
                        type="datetime-local"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ height: '42px', marginBottom: '12px' }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Laboratorio</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                Realiza una búsqueda para ver el historial o no se encontraron resultados.
                            </td>
                        </tr>
                    ) : (
                        reservas.map((reserva) => (
                            <tr key={reserva.id_reserva || `${reserva.id_estudiante}-${reserva.fecha_hora}`}>
                                <td style={{ textAlign: 'center' }}>{reserva.id_estudiante}</td>
                                <td style={{ textAlign: 'center' }}>{reserva.nombre}</td>
                                <td style={{ textAlign: 'center' }}>{reserva.laboratorio}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {new Date(reserva.fecha_hora).toLocaleString('es-DO', { dateStyle: 'short', timeStyle: 'short' })}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
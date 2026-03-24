import React, { useState } from 'react';
import type { Reserva } from '../types';
// import { reservasApi } from '../api/client'; // Descomentar al conectar con AWS

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
            // Cuando tengas el API Gateway listo, usarás esta línea:
            // const data = await reservasApi.obtenerPasadas(fechaInicio, fechaFin);

            // Simulación de datos para pruebas locales:
            console.log(`Buscando desde ${fechaInicio} hasta ${fechaFin}`);
            const dataSimulada: Reserva[] = [
                { id_estudiante: '1231232', nombre: 'Estudiante 3', carrera: 'ISC', laboratorio: 'Comunicaciones', fecha_hora: '2020-07-11T15:00:00Z' }
            ];
            setReservas(dataSimulada);

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
                    style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px' }}
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
                        style={{ padding: '8px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>Fecha Fin:</label>
                    <input
                        type="datetime-local"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        style={{ padding: '8px' }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer', height: '35px' }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                <thead>
                    <tr style={{ backgroundColor: '#fafafa' }}>
                        <th style={{ padding: '12px', border: '1px solid #ccc' }}>ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ccc' }}>Nombre</th>
                        <th style={{ padding: '12px', border: '1px solid #ccc' }}>Laboratorio</th>
                        <th style={{ padding: '12px', border: '1px solid #ccc' }}>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                Realiza una búsqueda para ver el historial.
                            </td>
                        </tr>
                    ) : (
                        reservas.map((reserva) => (
                            <tr key={reserva.id_reserva || `${reserva.id_estudiante}-${reserva.fecha_hora}`}>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>{reserva.id_estudiante}</td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>{reserva.nombre}</td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>{reserva.laboratorio}</td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>
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
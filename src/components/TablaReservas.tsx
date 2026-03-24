import React from 'react';
import type { Reserva } from '../types';

interface TablaReservasProps {
    reservas: Reserva[];
    onAgregarClick: () => void;
}

export const TablaReservas: React.FC<TablaReservasProps> = ({ reservas, onAgregarClick }) => {
    return (
        <div style={{ padding: '0 20px', fontFamily: 'sans-serif' }}>
            <button onClick={onAgregarClick} className="btn-primary" style={{ marginBottom: '15px' }}>
                Agregar Reserva
            </button>

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
                                No hay reservas activas en este momento.
                            </td>
                        </tr>
                    ) : (
                        reservas.map((reserva) => (
                            // Usamos id_reserva como key, o un fallback si no existe
                            <tr key={reserva.id_reserva || `${reserva.id_estudiante}-${reserva.fecha_hora}`}>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    {reserva.id_estudiante}
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    {reserva.nombre}
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    {reserva.laboratorio}
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center' }}>
                                    {/* Formateamos la fecha ISO a un formato legible */}
                                    {new Date(reserva.fecha_hora).toLocaleString('es-DO', {
                                        dateStyle: 'short',
                                        timeStyle: 'short'
                                    })}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
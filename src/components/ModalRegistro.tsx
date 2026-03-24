import React, { useState } from 'react';
import type { Reserva } from '../types';

interface ModalRegistroProps {
    onClose: () => void;
    onSave: (reserva: Reserva) => Promise<void>;
}

export const ModalRegistro: React.FC<ModalRegistroProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id_estudiante: '',
        nombre: '',
        carrera: '',
        laboratorio: '',
        fecha_hora: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Pasamos los datos estructurados según nuestra interfaz
            await onSave({
                ...formData,
                correo: `${formData.id_estudiante}@pucmm.edu.do` // Simulamos un correo ya que las reglas lo piden
            });
            onClose(); // Cerramos el modal si fue exitoso
        } catch (err: any) {
            setError(err.message || 'Error al guardar la reserva');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{ textAlign: 'center', marginTop: 0 }}>Registro Reserva</h2>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>ID</label>
                    <input required name="id_estudiante" value={formData.id_estudiante} onChange={handleChange} />

                    <label>Nombre</label>
                    <input required name="nombre" value={formData.nombre} onChange={handleChange} />

                    <label>Carrera</label>
                    <input required name="carrera" value={formData.carrera} onChange={handleChange} />

                    <label>Laboratorio</label>
                    <select required name="laboratorio" value={formData.laboratorio} onChange={handleChange}>
                        <option value="">Seleccionar Laboratorio</option>
                        <option value="REDES">REDES</option>
                        <option value="Computacion">Computación</option>
                        <option value="Comunicaciones">Comunicaciones</option>
                    </select>

                    <label>Fecha Reserva</label>
                    <input required type="datetime-local" name="fecha_hora" value={formData.fecha_hora} onChange={handleChange} step="3600" />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} disabled={loading} className="btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Guardando...' : 'OK'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
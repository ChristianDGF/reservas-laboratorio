import type { Reserva } from '../types';

// TODO: Reemplazar esta URL con la que te genere AWS API Gateway en el laboratorio
const API_BASE_URL = 'https://tucodigo.execute-api.us-east-1.amazonaws.com/prod';

export const reservasApi = {
    // Obtener todas las reservas cuya fecha no ha expirado [cite: 26]
    obtenerActivas: async (): Promise<Reserva[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas/activas`);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return await response.json();
        } catch (error) {
            console.error('Error al obtener reservas activas:', error);
            throw error;
        }
    },

    // Mostrar registros pasados por rango de fecha [cite: 27]
    obtenerPasadas: async (fechaInicio: string, fechaFin: string): Promise<Reserva[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas/pasadas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return await response.json();
        } catch (error) {
            console.error('Error al obtener historial:', error);
            throw error;
        }
    },

    // Registrar una nueva reserva pasando por las reglas de negocio [cite: 20]
    crearReserva: async (nuevaReserva: Reserva): Promise<Reserva> => {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaReserva),
            });

            const data = await response.json();

            if (!response.ok) {
                // Lanzamos el mensaje de error que configuramos en la Lambda (ej. límite de 7 personas) [cite: 24]
                throw new Error(data.mensaje || 'Error al crear la reserva');
            }

            return data.reserva;
        } catch (error) {
            console.error('Error al crear reserva:', error);
            throw error;
        }
    }
};
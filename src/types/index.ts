export interface Reserva {
    id_reserva?: string;       // El UUID generado por el backend, es opcional al crear
    id_estudiante: string;     // El ID o Matrícula 
    nombre: string;            // Nombre del estudiante 
    correo?: string;           // Requerido en las reglas de negocio 
    carrera: string;           // Solicitado en el mockup de registro [cite: 63]
    laboratorio: string;       // El laboratorio a reservar [cite: 19, 66]
    fecha_hora: string;        // Fecha y hora en formato ISO [cite: 19, 68]
}

export interface RespuestaApi {
    mensaje: string;
    reserva?: Reserva;
    error?: string;
}
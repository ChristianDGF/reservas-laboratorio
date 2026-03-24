import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLA = "Reservas";

export const handler = async (event) => {
    try {
        // Parsear el body que envía el frontend en React
        const body = JSON.parse(event.body);
        const { id_estudiante, nombre, carrera, laboratorio, fecha_hora } = body;

        const fechaReserva = new Date(fecha_hora);
        const hora = fechaReserva.getHours();
        const minutos = fechaReserva.getMinutes();

        // REGLA 1: Múltiplos de hora exacta y horario de 8 AM a 9 PM
        if (minutos !== 0 || hora < 8 || hora > 21) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ mensaje: "La reserva debe ser a una hora en punto (ej. 14:00) y entre las 8 AM y 9 PM." })
            };
        }

        // REGLA 2: Máximo 7 personas por hora de forma simultánea
        // Nota: Usamos Scan por simplicidad para la práctica, pero en producción se usaría un índice (Query).
        const result = await dynamo.send(new ScanCommand({
            TableName: TABLA,
            FilterExpression: "laboratorio = :lab AND fecha_hora = :fecha",
            ExpressionAttributeValues: {
                ":lab": laboratorio,
                ":fecha": fecha_hora
            }
        }));

        if (result.Count >= 7) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ mensaje: "El laboratorio ya alcanzó el límite de 7 personas para esta hora." })
            };
        }

        // Si pasa las validaciones, guardamos en DynamoDB
        const nuevaReserva = {
            id_reserva: randomUUID(),
            id_estudiante,
            nombre,
            carrera,
            laboratorio,
            fecha_hora,
            estado: "ACTIVA"
        };

        await dynamo.send(new PutCommand({
            TableName: TABLA,
            Item: nuevaReserva
        }));

        return {
            statusCode: 201,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ mensaje: "Reserva creada exitosamente", reserva: nuevaReserva })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ mensaje: "Error interno", error: error.message })
        };
    }
};
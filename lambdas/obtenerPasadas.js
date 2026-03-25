import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const fecha_inicio = event.queryStringParameters?.fecha_inicio;
        const fecha_fin = event.queryStringParameters?.fecha_fin;

        if (!fecha_inicio || !fecha_fin) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ mensaje: "Faltan los parámetros de rango de fecha (fecha_inicio y fecha_fin)" })
            };
        }

        const result = await dynamo.send(new ScanCommand({
            TableName: "Reservas",
            FilterExpression: "fecha_hora BETWEEN :inicio AND :fin",
            ExpressionAttributeValues: {
                ":inicio": fecha_inicio,
                ":fin": fecha_fin
            }
        }));

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(result.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ mensaje: "Error al obtener historial", error: error.message })
        };
    }
};
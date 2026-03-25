import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const ahora = new Date().toISOString();

        const result = await dynamo.send(new ScanCommand({
            TableName: "Reservas",
            FilterExpression: "fecha_hora > :ahora",
            ExpressionAttributeValues: {
                ":ahora": ahora
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
            body: JSON.stringify({ mensaje: "Error al obtener reservas activas", error: error.message })
        };
    }
};
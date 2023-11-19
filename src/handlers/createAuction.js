import { v4 as uuid } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const dynamodb = DynamoDBDocumentClient.from(client);

export const createAuction = async (event, context) => {
  const { title } = JSON.parse(event.body);

  const createdAt = new Date().toISOString();

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt,
  };

  await dynamodb.send(
    new PutCommand({
      TableName: "AuctionsTable",
      Item: auction,
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
};

export const handler = createAuction;

// Import necessary modules from the AWS SDK v3
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
// const { CreateTableCommandInput } = require("@aws-sdk/client-dynamodb/dist/cjs/commands/CreateTableCommand");

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "eu-west-2" });

const params = {
  TableName: "Accessibilities",
  KeySchema: [
    // Partition Key
    { AttributeName: "name", KeyType: "HASH" } 
  ],
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

// Convert the params to the appropriate v3 format
const command = new CreateTableCommand(params);

// Call the createTable command using the DynamoDB client
client.send(command)
  .then((data) => {
    console.log("Created table with description: ", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("Unable to create table: ", JSON.stringify(err, null, 2));
  });

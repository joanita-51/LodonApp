// Import necessary modules from the AWS SDK v3
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import fs from "fs";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "eu-west-2" });

console.log("Writing entries to Accessibilities table.");

// Read data from the JSON file
const accessibilitiesData = JSON.parse(
  fs.readFileSync("../components/data/accessibility.json", "utf8")
);

// Function to asynchronously add items to the table
async function addItemsToTable() {
  for (const accessibility of accessibilitiesData) {
    console.log("Current Accessibility Object:", accessibility); 
    const params = {
      TableName: "Accessibilities",
      Item: marshall({
        "name": {S: encodeURIComponent(accessibility.name)},
      }),
    };

    try {
      await client.send(new PutItemCommand(params));
      console.log("Added", accessibility.name, "to table.");
    } catch (error) {
      console.error(
        "Unable to load data into table for accessibilities",
        accessibility.name,
        ". Error: ",error
      );
    }
  }
}

// Call the function to add items to the table
addItemsToTable();

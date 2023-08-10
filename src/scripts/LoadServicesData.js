var AWS = require("aws-sdk"),
    {
      DynamoDBDocument
    } = require("@aws-sdk/lib-dynamodb"),
    {
      DynamoDB
    } = require("@aws-sdk/client-dynamodb");
var fs = require('fs');

AWS.config.update({
  region: "eu-west-2"
});

console.log("Writing entries to Services table.");

var dynamodb = DynamoDBDocument.from(new DynamoDB());
var servicesData = 
  JSON.parse(fs.readFileSync('../components/data/services.json', 'utf8'));

servicesData.forEach(function(service) {
  var params = {
    TableName: "Services",
    Item: {
      "name": service.name
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for services",
      service.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", service.name, "to table.")
  })
});
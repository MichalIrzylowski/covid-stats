const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

function addOperationIdsToSchema(schema) {
  const data = schema;

  Object.keys(data.paths).forEach((endpointPath) => {
    const operations = Object.keys(data.paths[endpointPath]);

    operations.forEach((operation) => {
      const oprationName = endpointPath.replace("/api/", "").replace(/\//g, "");
      data.paths[endpointPath][operation].operationId = oprationName;
    });
  });

  return data;
}

instance
  .get("https://disease.sh/apidocs/swagger_v3.json")
  .then((response) => {
    const updatedSchema = addOperationIdsToSchema(response.data);
    fs.writeFileSync(
      path.resolve(__dirname, "../typings/api-schema.json"),
      JSON.stringify(updatedSchema, null, 2)
    );

    console.log("==> Schema fetched successfully...");
  })
  .catch(console.error);

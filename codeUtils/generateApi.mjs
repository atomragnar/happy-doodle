// generateApi.mjs
import { quicktype, InputData, JSONSchemaInput, TypeScriptTargetLanguage } from '@quicktype/core';

async function generateTypescriptFromOpenAPI(schemaJson, outputFilename) {
  const inputData = new InputData();
  const source = { name: "API", schema: schemaJson };
  await inputData.addSource("schema", source, () => new JSONSchemaInput(undefined));

  const result = await quicktype({
    inputData,
    lang: new TypeScriptTargetLanguage(),
    // Additional options can be specified here
  });

  // Here you would write `result.lines` to `outputFilename`
  // For simplicity, this example just logs the output
  console.log(result.lines.join("\n"));
}

async function generateTypescriptFromGraphQL(schema, outputFilename) {
  // Implement GraphQL schema handling similar to the OpenAPI example above
  // You may need a GraphQL source instead of JSONSchemaInput
  console.log("GraphQL schema handling to be implemented");
}

export { generateTypescriptFromOpenAPI, generateTypescriptFromGraphQL };

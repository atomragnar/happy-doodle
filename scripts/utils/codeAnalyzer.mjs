// codeAnalyzer.mjs
import ts from 'typescript';

/**
 * Parses a file to extract TypeScript interfaces.
 * @param {string} filePath - Path to the TypeScript or JavaScript file.
 * @returns {Array<Object>} - An array of objects representing the extracted interfaces.
 */
export async function extractInterfaces(filePath) {
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
  });
  const sourceFile = program.getSourceFile(filePath);

  const interfaces = [];

  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceObj = {
        name: node.name.text,
        properties: [],
      };

      node.members.forEach(member => {
        if (ts.isPropertySignature(member)) {
          const propertyName = member.name.getText(sourceFile);
          const propertyType = member.type ? member.type.getText(sourceFile) : 'unknown';
          interfaceObj.properties.push({ name: propertyName, type: propertyType });
        }
      });

      interfaces.push(interfaceObj);
    }
  });

  return interfaces;
}


// // main.mjs
// import { extractInterfaces } from './codeAnalyzer.mjs';

// const filePath = './path/to/your/codefile.ts';

// extractInterfaces(filePath)
//   .then(interfaces => {
//     console.log('Extracted Interfaces:', interfaces);
//     // Further processing, documentation generation, or test data creation goes here
//   })
//   .catch(error => {
//     console.error('Error extracting interfaces:', error);
//   });

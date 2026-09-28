import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const schemaDirectory = new URL('../schemas/', import.meta.url);
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const studentResponseUrl = new URL('student_response.json', schemaDirectory);
ajv.addSchema(JSON.parse(readFileSync(fileURLToPath(studentResponseUrl), 'utf8')), 'student_response.json');

export async function validateAgainstSchema(schemaFileName, responseBody) {
  const schemaUrl = new URL(schemaFileName, schemaDirectory);
  const schema = JSON.parse(await readFile(fileURLToPath(schemaUrl), 'utf8'));
  const valid = ajv.validate(schema, responseBody);
  return { valid: Boolean(valid), errors: ajv.errors ?? [] };
}
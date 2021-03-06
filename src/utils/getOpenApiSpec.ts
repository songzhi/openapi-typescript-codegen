import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Check if given file exists and try to read the content as string.
 * @param filePath
 */
function read(filePath: string): string {
    if (fs.existsSync(filePath)) {
        try {
            return fs.readFileSync(filePath, 'utf8').toString();
        } catch (e) {
            throw new Error(`Could not read OpenApi spec: "${filePath}"`);
        }
    }
    throw new Error(`Could not find OpenApi spec: "${filePath}"`);
}

/**
 * Load and parse te open api spec. If the file extension is ".yml" or ".yaml"
 * we will try to parse the file as a YAML spec, otherwise we will fallback
 * on parsing the file as JSON.
 * @param filePath
 */
export function getOpenApiSpec(filePath: string): any {
    const content = read(filePath);
    const extname = path.extname(filePath).toLowerCase();
    switch (extname) {
        case '.yml':
        case '.yaml':
            try {
                return yaml.safeLoad(content);
            } catch (e) {
                throw new Error(`Could not parse OpenApi YAML: "${filePath}"`);
            }

        default:
            try {
                return JSON.parse(content);
            } catch (e) {
                throw new Error(`Could not parse OpenApi JSON: "${filePath}"`);
            }
    }
}

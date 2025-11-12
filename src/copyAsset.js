import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve(scriptDir, '..');

// --- Configuration ---
const PYTHON_PACKAGE_NAME = 'model_api';
const PYTHON_PACKAGE_VERSION = '0.1.0'; 
const WHEEL_FILENAME = `${PYTHON_PACKAGE_NAME}-${PYTHON_PACKAGE_VERSION}-py3-none-any.whl`;

// Define source and target directories relative to the project root
const SOURCE_DIR = path.resolve(__dirname, 'src', 'models', 'dist');
const TARGET_DIR = path.resolve(__dirname, 'public');

const sourcePath = path.join(SOURCE_DIR, WHEEL_FILENAME);
const targetPath = path.join(TARGET_DIR, WHEEL_FILENAME);

console.log(`Copying ${WHEEL_FILENAME} to public folder...`);

try {
    // 1. Check if the source file exists
    if (!fs.existsSync(sourcePath)) {
        console.error(`ERROR: Source file not found at ${sourcePath}`);
        console.error("Please ensure you have run 'npm run build:python' and the version/name is correct in the script.");
        process.exit(1);
    }
    
    // 2. Perform the synchronous file copy
    fs.copyFileSync(sourcePath, targetPath);
    
    console.log(`Successfully copied ${WHEEL_FILENAME} to ${path.relative(__dirname, targetPath)}.`);

} catch (error) {
    console.error(`Asset copy failed: ${error.message}`);
    process.exit(1);
}
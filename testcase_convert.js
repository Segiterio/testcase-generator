import * as fs from "node:fs/promises";
import path from "path";
import { getDesiredFormatTestCases } from "./functions/getDesiredFormatTestCases.js";

// 1. Read input file path from command line
const filePathForInput = process.argv[2];
if (!filePathForInput) {
  console.error("Please provide a file path!");
  process.exit(1);
}

// 2. Read content
let content;
try {
  content = await fs.readFile(filePathForInput, "utf8");
} catch (err) {
  console.error("Error reading input file:", err);
  process.exit(1);
}

// 3. Prepare output path
const parsedPath = path.parse(filePathForInput); // { root, dir, base, name, ext }
const outputDir = path.join("./output", parsedPath.dir.split("/").at(-1)); // keep folder structure
const outputFilePath = path.join(outputDir, parsedPath.base);

const parsedContent = JSON.parse(content);

let outputFileData = getDesiredFormatTestCases(parsedContent?.results);

// 4. Create output directory if it doesn't exist
await fs.mkdir(outputDir, { recursive: true });

// 5. Write content
await fs.writeFile(outputFilePath, outputFileData, "utf8");

console.log(`File written successfully to ${outputFilePath}`);

import RandomTestCaseGenerator from "./random-test-case-generator.js";

// Usage examples
const generator = new RandomTestCaseGenerator();

// Example 1: Basic usage
// console.log("=== Basic Usage Examples ===");
// console.log("Random int (1-100):", generator.randomInt(1, 100));
// console.log("Random float (0-1):", generator.randomFloat(0, 1, 3));
// console.log("Random string (10 chars):", generator.randomString(10));
// console.log("Random array:", generator.randomIntArray(5, 1, 10));
// console.log("Random boolean:", generator.randomBool(0.7));
// console.log(
//   "Random choice:",
//   generator.randomChoice(["apple", "banana", "cherry"])
// );

// // Example 2: Complex test case generation
// console.log("\n=== Complex Test Case Example ===");
// const constraints = {
//   n: { type: "int", min: 1, max: 100 },
//   arr: { type: "intArray", size: 10, min: -50, max: 50, unique: false },
//   matrix: { type: "matrix", rows: 3, cols: 3, min: 0, max: 9 },
//   name: { type: "string", length: 8, charset: "abcdefghijklmnopqrstuvwxyz" },
//   isValid: { type: "bool", probability: 0.8 },
//   operation: {
//     type: "choice",
//     options: ["add", "subtract", "multiply", "divide"],
//   },
//   graph: { type: "graph", vertices: 5, edges: 6, directed: false },
//   tree: { type: "tree", vertices: 4 },
//   weightedEdges: {
//     type: "weightedEdges",
//     vertices: 4,
//     edges: 3,
//     minWeight: 1,
//     maxWeight: 10,
//     directed: true,
//   },
// };

// const testCase = generator.generateTestCase(constraints);
// console.log("Generated test case:", JSON.stringify(testCase, null, 2));

// // Example 3: Using seeds for reproducible tests
// console.log("\n=== Seeded Random Generation ===");
// generator.setSeed(12345);
// console.log("Seeded random 1:", generator.randomInt(1, 100));
// console.log("Seeded random 2:", generator.randomInt(1, 100));

// generator.setSeed(12345); // Reset with same seed
// console.log("Seeded random 1 (repeat):", generator.randomInt(1, 100)); // Should be same as first

// Example 4: Generate multiple test cases
console.log("\n=== Multiple Test Cases ===");
const simpleConstraints = {
  a: { type: "int", min: 0, max: 100000 },
  b: { type: "int", min: 0, max: 100000 },
  array: { type: "intArray", size: 5, min: 1, max: 100, unique: true },
};

for (let i = 0; i < 7; i++) {
  console.log(
    `Test case ${i + 1}:`,
    generator.generateTestCase(simpleConstraints)
  );
}

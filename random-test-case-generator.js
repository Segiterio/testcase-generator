class RandomTestCaseGenerator {
  constructor() {
    this.seed = null;
  }

  // Set seed for reproducible random values
  setSeed(seed) {
    this.seed = seed;
    this.seedRandom = this.createSeededRandom(seed);
  }

  // Simple seeded random number generator
  createSeededRandom(seed) {
    let current = seed;
    return () => {
      current = (current * 1664525 + 1013904223) % 2 ** 32;
      return current / 2 ** 32;
    };
  }

  getRandom() {
    return this.seed !== null ? this.seedRandom() : Math.random();
  }

  // Generate random integer between min and max (inclusive)
  randomInt(min, max) {
    if (min > max) throw new Error("min cannot be greater than max");
    return Math.floor(this.getRandom() * (max - min + 1)) + min;
  }

  // Generate random float between min and max
  randomFloat(min, max, decimals = 2) {
    if (min > max) throw new Error("min cannot be greater than max");
    const value = this.getRandom() * (max - min) + min;
    return parseFloat(value.toFixed(decimals));
  }

  // Generate random string with specified length and character set
  randomString(
    length,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  ) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(this.randomInt(0, charset.length - 1));
    }
    return result;
  }

  // Generate random array of integers
  randomIntArray(minLength, maxLength, min, max, unique = false) {
    if (minLength > maxLength) {
      throw new Error("minLength cannot be greater than maxLength");
    }

    // Pick a random array length between minLength and maxLength
    const size = this.randomInt(minLength, maxLength);

    const arr = [];
    const used = new Set();

    for (let i = 0; i < size; i++) {
      let value;
      if (unique) {
        if (used.size >= max - min + 1) {
          throw new Error("Cannot generate unique values: range too small");
        }
        do {
          value = this.randomInt(min, max);
        } while (used.has(value));
        used.add(value);
      } else {
        value = this.randomInt(min, max);
      }
      arr.push(value);
    }

    return arr;
  }

  // Generate random array of integers for matrix
  randomIntArrayMatrix(size, min, max, unique = false) {
    const arr = [];
    const used = new Set();

    for (let i = 0; i < size; i++) {
      let value;
      if (unique) {
        if (used.size >= max - min + 1) {
          throw new Error("Cannot generate unique values: range too small");
        }
        do {
          value = this.randomInt(min, max);
        } while (used.has(value));
        used.add(value);
      } else {
        value = this.randomInt(min, max);
      }
      arr.push(value);
    }
    return arr;
  }

  // Generate random 2D array/matrix
  randomMatrix(rows, cols, min, max) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix.push(this.randomIntArrayMatrix(cols, min, max));
    }
    return matrix;
  }

  // Generate random boolean with specified probability
  randomBool(probability = 0.5) {
    return this.getRandom() < probability;
  }

  // Generate random element from array
  randomChoice(array) {
    if (array.length === 0) throw new Error("Array cannot be empty");
    return array[this.randomInt(0, array.length - 1)];
  }

  // Generate random subset of array
  randomSubset(array, size) {
    if (size > array.length)
      throw new Error("Subset size cannot be larger than array");
    const shuffled = [...array].sort(() => this.getRandom() - 0.5);
    return shuffled.slice(0, size);
  }

  // Generate random graph (adjacency list)
  randomGraph(vertices, edges, directed = false) {
    const graph = {};
    for (let i = 0; i < vertices; i++) {
      graph[i] = [];
    }

    const maxEdges = directed
      ? vertices * (vertices - 1)
      : (vertices * (vertices - 1)) / 2;
    if (edges > maxEdges) throw new Error("Too many edges for given vertices");

    const edgeSet = new Set();
    let addedEdges = 0;

    while (addedEdges < edges) {
      const u = this.randomInt(0, vertices - 1);
      const v = this.randomInt(0, vertices - 1);

      if (u === v) continue; // No self loops

      const edgeKey = directed
        ? `${u}-${v}`
        : `${Math.min(u, v)}-${Math.max(u, v)}`;

      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        graph[u].push(v);
        if (!directed) graph[v].push(u);
        addedEdges++;
      }
    }

    return graph;
  }

  // Generate random tree (connected acyclic graph)
  randomTree(vertices) {
    if (vertices < 1) throw new Error("Tree must have at least 1 vertex");
    if (vertices === 1) return { 0: [] };

    const tree = {};
    for (let i = 0; i < vertices; i++) {
      tree[i] = [];
    }

    // Use Prüfer sequence to generate random tree
    const sequence = [];
    for (let i = 0; i < vertices - 2; i++) {
      sequence.push(this.randomInt(0, vertices - 1));
    }

    const degree = new Array(vertices).fill(1);
    for (const node of sequence) {
      degree[node]++;
    }

    for (const node of sequence) {
      for (let leaf = 0; leaf < vertices; leaf++) {
        if (degree[leaf] === 1) {
          tree[node].push(leaf);
          tree[leaf].push(node);
          degree[node]--;
          degree[leaf]--;
          break;
        }
      }
    }

    // Connect remaining two vertices with degree 1
    const remaining = [];
    for (let i = 0; i < vertices; i++) {
      if (degree[i] === 1) remaining.push(i);
    }
    if (remaining.length === 2) {
      tree[remaining[0]].push(remaining[1]);
      tree[remaining[1]].push(remaining[0]);
    }

    return tree;
  }

  // Generate random weighted edges
  randomWeightedEdges(vertices, edges, minWeight, maxWeight, directed = false) {
    const edgeList = [];
    const edgeSet = new Set();

    while (edgeList.length < edges) {
      const u = this.randomInt(0, vertices - 1);
      const v = this.randomInt(0, vertices - 1);

      if (u === v) continue;

      const edgeKey = directed
        ? `${u}-${v}`
        : `${Math.min(u, v)}-${Math.max(u, v)}`;

      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        const weight = this.randomInt(minWeight, maxWeight);
        edgeList.push([u, v, weight]);
      }
    }

    return edgeList;
  }

  // Generate test case with multiple constraints
  generateTestCase(constraints) {
    const testCase = {};

    for (const [key, constraint] of Object.entries(constraints)) {
      switch (constraint.type) {
        case "int":
          testCase[key] = this.randomInt(constraint.min, constraint.max);
          break;
        case "float":
          testCase[key] = this.randomFloat(
            constraint.min,
            constraint.max,
            constraint.decimals
          );
          break;
        case "string":
          testCase[key] = this.randomString(
            constraint.length,
            constraint.charset
          );
          break;
        case "intArray":
          testCase[key] = this.randomIntArray(
            // constraint.size,
            constraint.minLength,
            constraint.maxLength,
            constraint.min,
            constraint.max,
            constraint.unique
          );
          break;
        case "matrix":
          testCase[key] = this.randomMatrix(
            constraint.rows,
            constraint.cols,
            constraint.min,
            constraint.max
          );
          break;
        case "bool":
          testCase[key] = this.randomBool(constraint.probability);
          break;
        case "choice":
          testCase[key] = this.randomChoice(constraint.options);
          break;
        case "graph":
          testCase[key] = this.randomGraph(
            constraint.vertices,
            constraint.edges,
            constraint.directed
          );
          break;
        case "tree":
          testCase[key] = this.randomTree(constraint.vertices);
          break;
        case "weightedEdges":
          testCase[key] = this.randomWeightedEdges(
            constraint.vertices,
            constraint.edges,
            constraint.minWeight,
            constraint.maxWeight,
            constraint.directed
          );
          break;
        default:
          throw new Error(`Unknown constraint type: ${constraint.type}`);
      }
    }

    return testCase;
  }
}

export default RandomTestCaseGenerator;

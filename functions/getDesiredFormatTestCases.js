function getDesiredFormatTestCases(data) {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format of data");
    }

    let outputs = [];

    for (let x = 0; x < data.length; x++) {
      // Split by TestCase-<number>
      let expectedOutputStrings = data[x].expectedOutput
        .split(/TestCase-\d+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0); // remove empty strings

      for (let y = 0; y < expectedOutputStrings.length; y++) {
        outputs.push({
          output: expectedOutputStrings[y],
          input: "",
          visibleToUser: false,
        });
      }
    }

    return JSON.stringify(outputs);
  } catch (error) {
    console.log(error.message || error);
    process.exit(1);
  }
}

export { getDesiredFormatTestCases };

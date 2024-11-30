const fs = require('fs');

try {
  console.log("Trying to read a non-existent file...");
  const data = fs.readFileSync('nonexistent.txt', 'utf8'); // Will throw an error
  console.log(data);
} catch (error) {
  console.error("Error caught:", error.message); // Handle the error
} finally {
  console.log("Cleaning up resources...");
}

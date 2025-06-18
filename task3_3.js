const fs = require('fs');

console.log('Start of program');

// Blocking file read (synchronous)
const data = fs.readFileSync('example.txt', 'utf8');
console.log('File content (sync):', data);

console.log('Program continues AFTER file is read');

// This won't run until file reading is complete
setInterval(() => {
  console.log('Now working...', new Date().toISOString());
}, 500);

console.log('Start of program');

// Non-blocking file read (asynchronous)
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content (async):', data);
});

console.log('Program continues while file is being read...');

// Other operations can happen while file is reading
setInterval(() => {
  console.log('Still working...', new Date().toISOString());
}, 500);
const fs = require('fs');

// Read the file asynchronously
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  // Print file contents if successful
  console.log('File contents:\n', data);
});

console.log('Reading file... (this message appears first)');
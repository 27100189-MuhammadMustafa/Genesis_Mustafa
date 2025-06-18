const fs = require('fs');
const path = require('path');

// Read the current directory
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log(`Files in ${__dirname}:`);
  files.forEach(file => {
    console.log(`- ${file}`);
  });
});
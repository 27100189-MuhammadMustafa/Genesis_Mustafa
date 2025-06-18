const fs = require('fs');
b = fs.writeFile('log.txt', 'Hello, World!', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File written successfully');
});
setTimeout(() => {
    fs.unlink('log.txt', (deleteErr) => {
      if (deleteErr) {
        return console.error('Error deleting file:', deleteErr);
      }
      console.log('File deleted successfully');
    });
  }, 5000);
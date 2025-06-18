const fs = require('fs');
b = fs.writeFile('log.txt', 'Hello, World!', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File written successfully');
});
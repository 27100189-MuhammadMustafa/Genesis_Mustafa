const os = require('os');
const system = {
    CPUArchitecture: os.arch(),
    TotalMemory: os.totalmem(),
    FreeMemory: os.freemem(),
};
console.log('System Information:', system);
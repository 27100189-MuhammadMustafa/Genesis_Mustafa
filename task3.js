console.log('Start of the program');

//setTimeout
setTimeout(() => {
  console.log('setTimeout callback');
}, 0);

// setImmediate
setImmediate(() => {
  console.log('setImmediate callback');
});

// process.nextTick
process.nextTick(() => {
  console.log('process.nextTick callback');
});

// Promise resolution
Promise.resolve().then(() => {
  console.log('Promise resolved');
});

console.log('End of the program');

//the synchronous code runs first, then the microtasks (process.nextTick and Promise), and finally the macrotasks (setTimeout and setImmediate).
// Output:
// Start of the program
// End of the program
// process.nextTick callback
// Promise resolved
// setTimeout callback
// setImmediate callback

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('An event occurred!');
  setTimeout(() => {
    console.log('Timeout inside event handler');
  }, 1000);
});
console.log('Before emitting event');
myEmitter.emit('event');
console.log('After emitting event');

//timeout inside the event handler will execute after the event handler completes
// and the main thread is free, demonstrating that the event loop allows asynchronous operations to run after the current stack is cleared.
function longRunningOperation(callback) {
    // This simulates a CPU-intensive task
    function doHeavyWork() {
      const start = Date.now();
      // Blocking loop for demonstration (in real apps, avoid this!)
      while (Date.now() - start < 3000) {
        // Simulating 3 seconds of work
      }
      callback('Operation completed');
    }
  
    // Offload to the event loop using setImmediate
    setImmediate(() => {
      console.log('Starting heavy work...');
      doHeavyWork();
    });
  }
  
  console.log('Before calling longRunningOperation');
  
  longRunningOperation((result) => {
    console.log(result);
  });
  
  console.log('After calling longRunningOperation');
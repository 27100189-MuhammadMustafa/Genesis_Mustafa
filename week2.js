const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json());


app.use((req, res, next) => {
    console.log("First dummy middleware", req.url, req.method);
    next(); 
});

app.use((req, res, next) => {
    console.log("Second dummy middleware");
    next(); 
});

// Routes
app.get("/", (req, res) => {
    res.send('<html><head><title>My First Node.js Server</title></head><body><h1>Hello from Express.js Server!</h1></body></html>');
});

app.get("/contact-us", (req, res) => {
    res.send(`
        <h1>Please give your details</h1>
        <form action="/contact-us" method="POST">
            <input type="text" name="username" placeholder="Enter your name" />
            <input type="email" name="email" placeholder="Enter your email" />
            <input type="submit" value="Submit" />
        </form>`);
});

app.post("/contact-us", (req, res, next) => {
    //try {
        //if (!req.body.username || !req.body.email) {
            // Create and throw a custom error
            //const error = new Error('Username and email are required');
            //error.status = 400;
            //throw error;
        //}

        console.log("Received data:", req.body);
        
        res.json({
            message: 'Thank you for your details!',
            receivedData: req.body
        });
    //} catch (err) {
        // Pass error to error handling middleware
        //next(err);
    //}
});

//Custom error handling middleware

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    // Set default status code if not provided
    const statusCode = err.status || 500;
    
    // Send appropriate error response
    res.status(statusCode).json({
        error: {
            message: err.message || 'Something went wrong',
            status: statusCode,
            timestamp: new Date().toISOString()
        }
    });
});

// 404 Handler (catches all unhandled routes)
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Endpoint not found',
            status: 404,
            timestamp: new Date().toISOString()
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});
//this code does is for all tasks of week 2, except of rest API task.
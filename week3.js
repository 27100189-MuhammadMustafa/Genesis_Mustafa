const {MongoClient} = require('mongodb');

const url = "mongodb+srv://javedmustafa557:Mustafa123456789@mustafa.ixs2atb.mongodb.net/?retryWrites=true&w=majority&appName=Mustafa"
const dbName = "Mustafa";

const data = { name: 'Alice', age: 25}

async function connectToMongoDB(){
    const client = new MongoClient(url);
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection("users");
        const result = await collection.insertOne(data);
        console.log("Data inserted successfully", result);
    }catch(error){
        console.error("Error connecting to MongoDB", error);
    }
}

connectToMongoDB();
//task 1 and 2
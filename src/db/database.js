const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.database_userId}:${process.env.database_password}@ecommerce.1cpwntp.mongodb.net/codemarket?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://asp:asp@clinkapp.3taxxix.mongodb.net/codemarket?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

let users = await client.db("codemarket").collection('users');
let projects = await client.db("codemarket").collection('projects');

export { users, projects }
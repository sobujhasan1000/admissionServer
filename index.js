const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config()
const port= process.env.PORT ||5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zunrmyl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

   const collaCollection=client.db('admisson').collection('collage');
   app.get('/collage',async(req,res)=>{
     const result=await collaCollection.find().toArray();
     res.send(result)
   })

   app.get('/collage/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const query = { _id: new ObjectId(id) };
      const result = await collaCollection.findOne(query);
      if (!result) {
        res.status(404).json({ message: 'Collage not found' });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error('Error fetching collage data:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('admission is on')
})

app.listen(port,()=>{
    console.log(`admisson is on port ${port}`);
})
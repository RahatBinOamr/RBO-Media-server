const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://rboMedia:pA5nCOsrUjjRx6Cd@cluster0.1xniais.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
const postsCollection = client.db('rboMedia').collection('posts');
    try{
        app.get('/posts',async(req,res)=>{
            const query = {};
            const result = await postsCollection.find(query).toArray()
            console.log(result);
            res.send(result)
        })
        /* add post */
        app.post("/post", async (req, res) => {
            const filter = req.body;
            console.log(filter)
            const result = await postsCollection.insertOne(filter);
            res.send(result);
          });
      
       

          /* single post */
          app.get("/posts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await postsCollection.findOne(query);
        
            res.send(result);
          });
    }
    catch{
        console.error(error);
    }
}
run()

app.get('/',(req,res)=>{
res.send(`now media server is running ${port}`)
})
app.listen(port,()=>{
    console.log("server is running on ",port);
})
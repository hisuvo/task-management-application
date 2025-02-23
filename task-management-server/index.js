const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.TASK_MANAGEMENT_DB}:${process.env.TASK_MANAGEMENT_PASS}@cluster0.aiyi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("task-management");
const userCollection = database.collection("users");
const taskCollection = database.collection("tasks");

async function run() {
  try {
    // await client.connect();

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // ganaret user collection db
    app.post("/users", async (req, res) => {
      const user = req.body;

      const email = user.email;

      const query = { email: email };

      const isExistUser = await userCollection.findOne(query);
      if (isExistUser) {
        return res.send({ message: "user already exists", insertedId: null });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });

    // tasks
    app.get("/tasks", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(filter);
      res.send(result);
    });

    // tasks add in db
    app.post("/add-tasks", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    // tasks update
    app.patch("/tasks/:id", async (req, res) => {
      const { category } = req.body;
      const taskId = req.params.id;
      const filter = { _id: new ObjectId(taskId) };
      const updateDoc = {
        $set: {
          category,
        },
      };
      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // task delete
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const task = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: task,
      };
      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Hello World! From task mangaement application");
});

app.listen(port, () => {
  console.log("Server Port Number is ", port);
});

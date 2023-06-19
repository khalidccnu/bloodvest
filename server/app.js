require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const mdbClient = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access!" });

  jwt.verify(
    authorization.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        return res
          .status(403)
          .send({ error: true, message: "Forbidden access!" });

      req.decoded = decoded;
      next();
    }
  );
};

(async (_) => {
  try {
    const users = mdbClient.db("bloodvest").collection("users");

    const verifySelf = async (req, res, next) => {
      if (req.decoded._id !== req.params.identifier)
        return res
          .status(403)
          .send({ error: true, message: "Forbidden access!" });

      next();
    };

    app.get("/users/:identifier", verifyJWT, verifySelf, async (req, res) => {
      const query = { _id: req.params.identifier };
      const result = await users.findOne(query);

      res.send(result);
    });

    app.put("/users/:identifier", verifyJWT, verifySelf, async (req, res) => {
      const query = { _id: req.params.identifier };
      const result = await users.updateOne(query, { $set: req.body });

      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { _id: user._id };
      const exist = await users.findOne(query);

      if (exist)
        return res.send({ error: true, message: "User already exist!" });

      const result = await users.insertOne(user);

      res.send(result);
    });

    mdbClient
      .db("admin")
      .command({ ping: 1 })
      .then((_) => console.log("Successfully connected to MongoDB!"));
  } catch (err) {
    console.log("Did not connect to MongoDB! " + err.message);
  } finally {
    await mdbClient.close();
  }
})();

app.get("/", (req, res) => {
  res.send("BloodVest is running...");
});

app.post("/jwt", (req, res) => {
  const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.send(token);
});

app.listen(port, (_) => {
  console.log(`BloodVest API is running on port: ${port}`);
});

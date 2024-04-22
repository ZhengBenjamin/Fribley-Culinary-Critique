const express = require("express");
const mongodb = require("mongodb");

const router = express.Router(); 

//Get stations
router.get("/", async (req, res) => {
  const stations = await loadStationsCollection();
  res.send(await stations.find({}).toArray());
})

//Add stations
router.post('/', async (req, res) => {
  const stations = await loadStationsCollection();
  await stations.insertOne({
    station: req.body.station,
    ratings: [],
    comments: [],
    description: req.body.description,
    image: req.body.image,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Add rating
router.post('/:id/add-rating', async (req, res) => {
  const stations = await loadStationsCollection();
  const { rating } = req.body;

  await stations.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $push: { ratings: rating } }
  );

  res.status(200).send();
});

//Add comments
router.post('/:id/add-comment', async (req, res) => {
  const stations = await loadStationsCollection();
  const { comment } = req.body;

  await stations.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    { $push: { comments: comment } }
  );

  res.status(200).send();
});

//Delete stations
router.delete("/:id", async (req, res) => {
  const stations = await loadStationsCollection();
  await stations.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send();
})

async function loadStationsCollection() {
  const client = await mongodb.MongoClient.connect("mongodb+srv://bxz346:javascriptsucks@fcc.srtebjz.mongodb.net/?retryWrites=true&w=majority&appName=FCC", {
  });

  return client.db("fcc").collection("stations");
}

module.exports = router; 
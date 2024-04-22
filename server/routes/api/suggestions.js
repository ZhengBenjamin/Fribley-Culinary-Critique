const express = require("express");
const mongodb = require("mongodb");

const router = express.Router(); 

//Get suggestions
router.get("/", async (req, res) => {
  const suggestions = await loadSuggestionsCollection();
  res.send(await suggestions.find({}).toArray());
})

//Add suggestions
router.post('/', async (req, res) => {
  const suggestions = await loadSuggestionsCollection();
  await suggestions.insertOne({
    stationName: req.body.stationName,
    comments: req.body.comments,
    description: req.body.description,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Delete suggestions
router.delete("/:id", async (req, res) => {
  const suggestions = await loadSuggestionsCollection();
  await suggestions.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send();
})

async function loadSuggestionsCollection() {
  const client = await mongodb.MongoClient.connect("mongodb+srv://bxz346:javascriptsucks@fcc.srtebjz.mongodb.net/?retryWrites=true&w=majority&appName=FCC", {
  });

  return client.db("fcc").collection("suggestions");
}

module.exports = router; 
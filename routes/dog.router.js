const router = require('express').Router();
const Datastore = require('nedb');
const fetch = require('node-fetch');

const database = new Datastore('dogs3.db');
database.loadDatabase();

const _fetchDogs = async () => {
  const apiUrl = 'https://random.dog/woof.json';
  const fetch_res = await fetch(apiUrl);
  const json = await fetch_res.json();
  return json;
};

router.get('/image', ((req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
}));

router.post('/image', async (req, res) => {
  const dog = await _fetchDogs();

  if (dog.url.includes('.mp4') || dog.url.includes('.gif')) {
    res.status(400).send('video or gif can be posted');
    res.end();
    return;
  }

  if (req.query.size) {
    dog.fileSizeBytes = Number(req.query.size);
    await database.insert(dog);
    res.json(dog);
  }

  await database.insert(dog);
  res.json(dog);
});

module.exports = router;

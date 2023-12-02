const express = require('express');

const app = express();
const Thing = require('./models/thing');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://htjeux:JZYO24ZuSdz9OCBs@cluster0.xebjmhn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

app.use('/api/stuff', (_, res) => {
   Thing.find()
    .then(things => res.status(200).json(things))
    .catch(errot => res.status(400).json({ error }));
});

module.exports = app;
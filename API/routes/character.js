import express from 'express';
import character from '../models/character.js';
import Joi from '@hapi/joi';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const characte = await character.find({ userId: req.params.id });
  res.json({
    error: null,
    data: characte //Todos los usuarios
  });
});

router.get('/:id', async (req, res) => {
  const characterId = req.params.id;
  const character = await Users.findById(characterId);

  if (!character) {
    return res.status(404).json({
      error: 'Personaje no encontrado',
      data: null
    });
  }

  res.json({
    error: null,
    data: user
  });
});

router.post('/:id', async (req, res) => {

  const characterExists = await character.findOne({ name: req.body.name });
  if (characterExists) {
    return res.status(400).json(
      { error: `El personaje con nombre ${req.body.name} ya está registrado` }
    )
  }
  const characte = new character({
    name: req.body.name,
    level: req.body.level,
    lucky: req.body.lucky,
    attack: req.body.attack,
    health: req.body.health,
  });
  try {
    const savedCharacter = await characte.save()
    res.json({
      error: null,
      data: savedCharacter
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  if (id != req.body._id) {
    return res.status(400).json(
      { error: `El id ${id} no coincide con el de body` }
    )
  }

  const characterDatabase = await character.findOne({ name: req.body.name });
  if (!characterDatabase) {
    return res.status(400).json(
      { error: `El personaje con nombre ${req.body.character} no existe` }
    )
  }

  characterDatabase.name = req.body.name;
  characterDatabase.level = req.body.level;
  characterDatabase.lucky = req.body.lucky;
  characterDatabase.lucky = req.body.attack;
  characterDatabase.lucky = req.body.health;

  try {
    const savedCharacter = await characterDatabase.save();

    res.json({
      error: null,
      data: savedCharacter
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await character.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "Character deleted"
      })
      return;
    }
    res.status(404).json({ error: 'Character not found' });

  } catch (error) {
    res.status(400).json({ error: error })
  }
});

export default router
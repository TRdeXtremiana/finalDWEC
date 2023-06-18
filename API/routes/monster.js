import express from 'express';
import monster from '../models/monster.js';
import Joi from '@hapi/joi';

const router = express.Router();

router.get('/', async (req, res) => {
  const monsters = await monster.find();
  res.json({
    error: null,
    data: monsters //Todos los usuarios
  });
});

router.get('/:id', async (req, res) => {
  const monsterId = req.params.id;
  const monster = await monster.findById(monsterId);

  if (!monster) {
    return res.status(404).json({
      error: 'Monstruo no encontrado',
      data: null
    });
  }

  res.json({
    error: null,
    data: monster
  });
});

router.post('/', async (req, res) => {

  const monsterExists = await monster.findOne({ id: req.body.id });
  if (monsterExists) {
    return res.status(400).json(
      { error: `El monstruo con email ${req.body.id} ya está registrado` }
    )
  }
  const monste = new monster({
    name: req.body.name,
    email: req.body.email,
    level: req.body.level,
    health: req.body.health,
    attack: req.body.attack,
    defense: req.body.defense,
  });

  try {
    const savedMonster = await monster.save()
    res.json({
      error: null,
      data: savedMonster
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

  const monsterDatabase = await monster.findOne({ name: req.body.name });
  if (!monsterDatabase) {
    return res.status(400).json(
      { error: `El monstruo con nombre ${req.body.name} no existe` }
    )
  }

  monsterDatabase.name = req.body.name;
  monsterDatabase.email = email = req.body.email,
  monsterDatabase.level = req.body.level,
  monsterDatabase.health = req.body.health,
  monsterDatabase.attack = req.body.attack,
  monsterDatabase.defense = req.body.defense

  try {
    const savedMonster = await monsterDatabase.save();

    res.json({
      error: null,
      data: savedMonster
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await monster.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "Monster deleted"
      })
      return;
    }
    res.status(404).json({ error: 'Monster not found' });

  } catch (error) {
    res.status(400).json({ error: error })
  }
});

export default router
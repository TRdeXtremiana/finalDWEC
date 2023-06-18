import express from 'express';
import items from '../models/items.js';
import Joi from '@hapi/joi';

const router = express.Router();

router.get('/', async (req, res) => {
  const item = await items.find();
  res.json({
    error: null,
    data: item //Todos los usuarios
  });
});

router.get('/:id', async (req, res) => {
  const itemsId = req.params.id;
  const item = await items.findById(itemsId);

  if (!item) {
    return res.status(404).json({
      error: 'Item no encontrado',
      data: null
    });
  }

  res.json({
    error: null,
    data: user
  });
});

router.post('/', async (req, res) => {

  const itemsExists = await items.findOne({ name: req.body.name });
  if (itemsExists) {
    return res.status(400).json(
      { error: `El item ${req.body.name} ya está registrado` }
    )
  }
  const item = new items({
    name: req.body.name,
  });

  try {
    const savedItem = await items.save()
    res.json({
      error: null,
      data: savedItem
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

  const itemsDatabase = await items.findOne({ name: req.body.name });
  if (!itemsDatabase) {
    return res.status(400).json(
      { error: `El usuario con nombre ${req.body.name} no existe` }
    )
  }

  itemsDatabase.name = req.body.name;

  try {
    const savedItem = await itemsDatabase.save();

    res.json({
      error: null,
      data: savedItem
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await items.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "Item deleted"
      })
      return;
    }
    res.status(404).json({ error: 'Item not found' });

  } catch (error) {
    res.status(400).json({ error: error })
  }
});

export default router
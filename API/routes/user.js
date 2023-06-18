import express from 'express';
import Users from '../models/user.js';
import Joi from '@hapi/joi';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await Users.find();
  res.json({
    error: null,
    data: users //Todos los usuarios
  });
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await Users.findById(userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      data: null
    });
  }
  
  res.json({
    error: null,
    data: user
  });
});

router.post('/', async (req, res) => {
  
  const usersExists = await Users.findOne({ email: req.body.email });
  if (usersExists) {
    return res.status(400).json(
      { error: `El usuario con email ${req.body.email} ya está registrado` }
    )
  }
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass
  });
  try {
    const savedUser = await user.save()
    res.json({
      error: null,
      data: savedUser
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

  const userDatabase = await Users.findOne({ name: req.body.name });
  if (!userDatabase) {
    return res.status(400).json(
      { error: `El usuario con nombre ${req.body.name} no existe` }
    )
  }

  userDatabase.name = req.body.name;
  userDatabase.email = req.body.email;
  userDatabase.pass = req.body.pass;

  try {
    const savedUser = await userDatabase.save();

    res.json({
      error: null,
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteResponse = await Users.deleteOne({ _id: id });
    if (deleteResponse.deletedCount == 1) {
      res.json({
        error: null,
        data: "User deleted"
      })
      return;
    }
    res.status(404).json({ error: 'User not found' });

  } catch (error) {
    res.status(400).json({ error: error })
  }
});

export default router
// 1. Importar express

/* const express = require('express');
require('dotenv').config(); */

// Importar express y dotenv con ESmodule
import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
console.log(process.env.PORT)

const PORT = process.env.PORT
const app = express()

// funcion para leer el archivo db.json
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json') // Daba error porque no estaba el path correcto estaba en ./src/db.json y no en ./db.json y estoy en la carpeta express
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al leer el archivo db.json:', error)
    return null
  }
}

// Funcion para escribir en el archivo db.json
const writeData = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
    console.log('Datos escritos correctamente en db.json')
  } catch (error) {
    console.error('Error al escribir en el archivo db.json:', error)
  }
  // return JSON.stringify(data)
}

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  if (data) {
    res.json(data)
  } else {
    res.status(500).send('Error al leer los datos')
  }
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  if (result) {
    res.json(result)
  } else {
    res.status(404).send('Pelicula no encontrada')
  }
})

// Si no ponemos este middleware no nos va a funcionar el req.body pero si el id ya que lo coge de la url
app.use(express.json()) // Middleware para parsear JSON
app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }

  if (data && Array.isArray(data.accion)) {
    data.accion.push(newMovie)
    writeData(data)
    res.status(201).json(newMovie)
  } else {
    res.status(500).send('Error al leer los datos')
  }
})

app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body

  const index = data.accion.findIndex(pelicula => pelicula.id === id)
  if (index !== -1) {
    data.accion[index] = { ...data.accion[index], ...body }
    writeData(data)
    res.json({ message: 'Pelicula actualizada', pelicula: data.accion[index] })
  } else {
    res.status(404).send('Pelicula no encontrada')
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} \nhttp://localhost:${PORT}`)
})

// process.loadEnvFile()
// esta es una opcion sin instalar nada

// import { config } from 'dotenv'
// config()
/*
Importamos el modulo dotenv
Este modulo nos permite cargar variables de entorno desde un archivo .env que se encuentra en la raiz del proyecto
*/
require('dotenv').config()

console.log(process.env.PORT)
console.log(process.env.NOMBRE)
/* console.log(process) */
/* console.log(process.env) */

// Importamos el modulo express
const express = require('express')
const { infoPeliculas } = require('./peliculas.js')
console.log(infoPeliculas)

const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion', (req, res) => {
  res.send(infoPeliculas.accion)
})

app.get('/api/peliculas/accion/year/:year', (req, res) => {
  const year = parseInt(req.params.year)
  const peliculasAccion = infoPeliculas.accion.filter(pelicula => pelicula.year === year)

  if (peliculasAccion.length === 0) {
    return res.status(404).send({ error: 'No se encontraron peliculas de accion para el año especificado' })
  }

  res.send(peliculasAccion)
})

app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  // const titulo = req.params.titulo
  // const year = req.params.year
  let { titulo, year } = req.params // Desestructuramos los parametros
  year = parseInt(year) // Convertimos year a entero

  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo && pelicula.year === year)
  // const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo.toLowerCase().includes(titulo.toLowerCase()))
  // Alternativa para buscar en todas las categorias
  // const resultados = Object.values(infoPeliculas).flat().filter(pelicula => pelicula.titulo.toLowerCase().includes(titulo.toLowerCase()))

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron peliculas con el titulo: ${titulo} en el año: ${year}`)
    // return res.status(404).send({ error: 'No se encontraron peliculas con el titulo especificado' })
  }

  res.send(resultados)
})

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  console.log(req.query.ordenar)
  const pais = req.params.pais
  const resultados = infoPeliculas.comedia.filter(pelicula => pelicula.pais === pais)

  if (req.query.ordenar === 'year') {
    return res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

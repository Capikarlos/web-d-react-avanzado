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

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

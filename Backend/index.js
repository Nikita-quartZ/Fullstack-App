const express = require('express');
const { nanoid } = require('nanoid')
const fs = require('fs');
const db = require('./products.json')
var cors = require('cors')

const app = express();
app.use(express.json());

const MainPath = '/api/v1'
const dbPath = './products.json'

app.use(cors())

app.get(`${MainPath}/products`, async (req, res) => {
  res.json(db)
})

app.post(`${MainPath}/products`, async (req, res) => {
  const products = db.products
  const product = {
    ...req.body,
    id: nanoid(32)
  }
  products.push(product)

  const newData = {
    ...db,
    products,
    total: products.length,
    limit: products.length
  }

  fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2))
  res.json(newData)
})

app.put(`${MainPath}/products`, async (req, res) => {
  const products = db.products
  const index = products.findIndex(product =>  product.id === req.body.id)
  products[index] = req.body

  const newData = {
    ...db,
    products,
    total: products.length,
    limit: products.length
  }

  fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2))
  res.json(newData)
})

app.delete(`${MainPath}/products`, async (req, res) => {
  const oldInfo = {
    ...db
  }
  const products = db.products
  const newProducts = products.filter((item) => item.id !== Number(req.query.id))

  const newData = {
    ...oldInfo,
    products: newProducts,
    total: newProducts.length,
    limit: newProducts.length
  }

  fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2))
  res.json(newData)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
})
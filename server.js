require('dotenv').config()
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const [, ext] = file.originalname.split('.')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.${ext}`)
  }
})
const upload = multer({ storage })

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use("/uploads", express.static("./uploads"));
app.use(express.json())

app.post('/transaction/documents/upload', upload.array('documents', 3), (req, res) => {
  const files = req.files

  const filesList = files.map((file) => {
    return `/uploads/${file.filename}`
  })
  return res.json(filesList)
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})

require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())


app.use((err, req, res, next) => {
    console.log(err.stack)
    console.log(err.name)
    console.log(err.code)

    res.status(500).json({
        message: 'Something went rely wrong'
    })
})

app.use("/auth", require("./routes/authRoutes"))
app.use("/player", require("./routes/playerRoutes"))
app.use("prize", require("./routes/prizeRoutes"))


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

module.exports = app;
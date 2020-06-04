const express = require("express")
const app = express()

const connectDB = require("./config/db")

connectDB()

app.use(express.json({ extended: false }))

app.use("/api/users", require("./routes/api/users"))
app.use("/api/rtr", require("./routes/api/andpub"))
app.use("/api/app", require("./routes/api/app"))
app.use("/api/replies", require("./routes/api/reply"))

const PORT = process.env.PORT || "5000"

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))

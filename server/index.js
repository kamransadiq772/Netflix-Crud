const express = require('express')
const con = require('./db/db')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')


const app = express()
const port = 4000
con()

app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)






app.get('/', (req, res) => res.send('Hello World!'))













app.listen(port, () => console.log(`Example app listening on port ${port}!`))
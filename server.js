//get express server - can't use import without babel or typescript
const express = require('express')
const connectDB = require('./config/db')

//initialize express into variable
const app = express();

//connect DB
connectDB()

//Init Middleware 
app.use(express.json({ extended: false }))

//when server recieves get request
app.get('/', (req, res) => res.json({ msg: 'Welcome to contact keeper API' }))

//define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//PORT variable 
const PORT = process.env.PORT || 5000

//app object has listen method which takes the PORt which to listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

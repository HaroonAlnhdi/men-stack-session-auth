const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on('connected',() => {

 console.info(`connected to MongoBD ${mongoose.connection.name}`)
})

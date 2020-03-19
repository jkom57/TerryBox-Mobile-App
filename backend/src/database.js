const mongoose = require('mongoose')

const URI = `mongodb+srv://Root:Toor@clusterut-pwoit.azure.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: 'TerryBox',
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Database is connected')
})
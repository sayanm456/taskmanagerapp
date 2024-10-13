const express = require('express');
const { connectToDB, closeDB } = require('./db/db');


// Connect to the MongoDB Database before starting the server
connectToDB();

const app = express()
const port = 8000

app.use(express.json())

//Available Routes for apis
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tasks', require('./routes/tasks'))

// Close Database Connection on Server Shutdown
app.on('close', async () => {
  console.log('Closing the database connection...')
  await closeDB()
  console.log('Database connection closed')
  process.exit(0)
  // Gracefully exit the process when the server is closed. 0 indicates success. 1 indicates failure. 2 indicates a uncaught exception. 3 indicates a unhandled rejection. 4 indicates an unhandled promise rejection. 5 indicates a uncaught error in a worker thread. 6 indicates an unhandled error in a worker process. 7 indicates a unhandled error in a worker. 8 indicates an unhandled rejection in a worker. 9 indicates an unhandled error in a worker thread. 10 indicates an unhandled error in a worker process. 11 indicates an unhandled error in a worker. 12 indicates an unhandled rejection in a worker. 13 indicates an unhandled error in a worker thread. 14 indicates an unhandled error in a worker process. 15 indicates an unhandled error in a worker.
})

// Start the server
app.listen(port, () => {
  console.log(`taskmanager app listening on http://127.0.0.1:${port}`)
})
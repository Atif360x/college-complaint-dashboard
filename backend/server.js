const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config/config');
const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

app.get("/", (req, res) => res.send("API working"));

connectDB()
.then(() => {
    app.listen(3001, () => {
        console.log(`Server is running on port 3001`);
        console.log('connected to database');
    })
}).catch((err) => {
        console.error('Error starting server:', err);
    });
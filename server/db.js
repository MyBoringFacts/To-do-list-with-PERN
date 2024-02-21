const Pool = require ("pg").Pool;
const pool = new Pool ({
    user: "yourDatabaseUserName",
    password : "yourDatabasePassword",
    host: "localhost",
    port: 5432,
    database : "perntodo"
})
module . exports = pool;

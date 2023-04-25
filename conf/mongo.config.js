const mysql=require("mysql2")

const pool = mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password,

});

module.exports = pool.promise();

const mysql=require("mysql2")

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'e-commerce',
    password:'root',

});

let sql="SELECT * FROM names;"

pool.execute(sql,function(err,result){
    if(err)throw err;

    

})

module.exports = pool.promise();
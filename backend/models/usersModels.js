const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", connectionLimit: 5});

/* 
Objeto traido por el body con los datos de acceso para un usuario 

{
   email: ,
   password: ,
}
*/

// Retorna un usuario de la base de datos con email=email
async function getUser(email){
    let conn;
    try{
        conn = await pool.getConnection();

        let user = await conn.query("SELECT * FROM users WHERE email=?", [email]);
        
        return user[0];

    } finally {
        if (conn)
          conn.release()
    }
}

module.exports = {
    getUser,
}
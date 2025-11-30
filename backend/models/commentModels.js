const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", connectionLimit: 5});


async function getComments(productID){
    let conn;
   
    try {
       conn = await pool.getConnection();
       
       let data = await conn.query(
          "SELECT product_Id, score, description, user, dateTime FROM comments WHERE product_Id =?",
          [productID]
       );
 
       for(let item of data){
          let product     = item.product_Id;
          item.product_Id = undefined;
          item.product    = product;
       }
             
       return (data)
    }

    finally {
       if (conn)
          conn.release();
    } 

    return false;
}


module.exports = {
    getComments, 
}
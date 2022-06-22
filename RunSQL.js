var express = require('express'),
    fs = require('fs');

var app = express();

function getLines (filename) {
    const data = fs.readFileSync(filename,
              {encoding:'utf8', flag:'r'});
    let lines = data.split("\n");
    return lines;
  };
  
var sql = require("mssql");
var config = {
    user: 'ADMIN',
    password: '123456',
    server: 'DESKTOP-8H8VJ4K', 
    database: 'DATA_XML',
    synchronize: true,
    trustServerCertificate: true // change to true for local dev / self-signed certs
};

async function Insert() {
    await sql.connect(config);

    let query = getLines(`./SQL_1000_SinhVien1000.txt`);
    let i = 0;

    // Get time before start
    console.time('codezup')

    //query
        await sql.query(`
            
        `, async function(err, data) {
            try {
              for await (const doc of data.recordset) {
                console.dir(doc);
              }

            } catch(err) {
            //  console.log(err)
            };
            console.log(data.rowsAffected)
            
            console.timeEnd('codezup'); 
            sql.close();
            // Get time after finish

          }); 
    
    return 'done.';
}

Insert()
  .then(console.log)
  .catch(console.error)

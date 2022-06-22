const { MongoClient } = require('mongodb');
var fs = require('fs');
const { strictEqual } = require('assert');

const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

function getLines (filename) {
  const data = fs.readFileSync(filename,
            {encoding:'utf8', flag:'r'});
  let lines = data.split("\n");
  return lines;
};

let obj = JSON.parse(`{"Data": []}`);

async function main() {

  // Get time before start
  console.time('codezup');

  await FinishExcute().then(async (res) => {
    for await (const doc of res){
      console.dir(doc);
     // obj['Data'].push(doc);
    };
    
    console.timeEnd('codezup');
    // Get time after finish
    client.close();
  })
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)

async function FinishExcute() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const collection = db.collection('Nested Document');
    
  var cursor = await collection.find({ 
    // query
  });

  return cursor;
}
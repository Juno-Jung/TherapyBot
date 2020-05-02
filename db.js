const fs = require('fs');
const db = { msgs: [] };
const dbPath = __dirname + '/data.json';

fs.readFile(dbPath, 'utf-8', function (err, data) {
  try {
    data = JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
  if (data && data.msgs) {
    db.msgs = data.msgs;
  }
});

setInterval(() => {
  fs.writeFile(dbPath, JSON.stringify(db), function (err) {
    if (err) throw err;
  })
}, 5000);

module.exports = db;

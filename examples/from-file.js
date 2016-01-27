const path = require('path');
const fc2svg = require('../lib/index.js');

fc2svg.fromFile(path.join(__dirname, './data/mscombidy2d.json')).then((svg) => {
  console.log(svg);
}).catch((error) => {
  console.log(error);
});

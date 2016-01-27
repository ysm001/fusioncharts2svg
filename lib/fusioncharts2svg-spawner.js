const path = require('path');
const exec = require('child_process').exec;
const phantomjs = require('phantomjs');
const fs = require('fs');
const phantomBinPath = phantomjs.path;

function makeTmpDirectory() {
  const tmpPath = path.resolve('./tmp/');
  fs.mkdir(tmpPath, (err) => {
    if (err && err.code != 'EEXIST') {
      throw err;
    }
  });

  return tmpPath;
}

function spawnConverterFromFile(dataSourceFile) {
  const command = `${phantomBinPath} ${path.join(__dirname, '../bin/fusioncharts2svg.js')} ${dataSourceFile}`;

  const deferred = Promise.defer();
  exec(command, (err, stdout, stderr) => {
    if (err) deferred.reject(err);
    else if (stderr) deferred.reject(stderr);

    const out = JSON.parse(stdout);
    out.result ? deferred.resolve(out.svg) : deferred.reject(out.error);
  });

  return deferred.promise;
}

function spawnConverterFromObject(dataSource) {
  const tmpPath = makeTmpDirectory();
  const tmpFileName = `${tmpPath}/${Date.now()}.json`;
  fs.writeFileSync(tmpFileName, JSON.stringify(dataSource));

  return spawnConverterFromFile(tmpFileName).then((svg) => {
    fs.unlinkSync(tmpFileName);
    return svg;
  });
}

module.exports.fromFile = spawnConverterFromFile;
module.exports.fromObject = spawnConverterFromObject;

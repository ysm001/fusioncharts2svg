const path = require('path');
const childProcess = require('child_process');
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
  const childArgs = [
    path.join(__dirname, '../bin/fusioncharts2svg.js'),
    dataSourceFile
  ]

  const deferred = Promise.defer();
  childProcess.execFile(phantomBinPath, childArgs, (err, stdout, stderr) => {
    if (err) deferred.reject(err);
    else if (stderr) deferred.reject(stderr);

    deferred.resolve(stdout);
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

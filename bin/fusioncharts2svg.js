#!/usr/bin/env phantomjs

const page = require('webpage').create();
const system = require('system');
const fs = require('fs');
const rootPath = phantom.libraryPath + '/../';

if (system.args.length !== 2) {
  console.log('Usage: ' + system.args[0] + ' datasource-json-file');
  phantom.exit(1);
}

const dataSource = fs.read(system.args[1]);

function readRenderFile() {
  return fs.read(rootPath + '/templates/template.html');
}

function replaceChartContent(content, json) {
  return content.replace('env.chartJson', JSON.stringify(json));
}

function writeToTmpFile(content) {
  const tmpDir = rootPath + '/tmp';
  const filePath = tmpDir + '/' + Date.now() + '.html';

  fs.makeDirectory(tmpDir);
  fs.write(filePath, content, 'w');

  return filePath;
}

function createRenderFile(json) {
  const content = readRenderFile();
  const newContent = replaceChartContent(content, json);
  return writeToTmpFile(newContent);
}

function exit(code, tmpFile) {
  if (tmpFile) {
    fs.remove(tmpFile);
  }

  phantom.exit(code);
}

try {
  const htmlFile = createRenderFile(dataSource);
} catch(error) {
  exit(1);
};

page.open(htmlFile, function(status) {
  if (status === 'fail') {
    console.log('Error! failed to open ' + htmlFile);
    exit(1);
  }

  page.onCallback = function(data) {
    console.log(JSON.stringify(data));
    exit(0, htmlFile);
  }

  page.onError = function(error) {
    console.log(error);
    exit(1, htmlFile);
  }

  page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
  };
});

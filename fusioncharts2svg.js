#!/usr/bin/env phantomjs

const page = require('webpage').create();
const system = require('system');
const fs = require('fs');

if (system.args.length !== 2) {
  console.log('Usage: ' + system.args[0] + ' datasource-json-file');
  phantom.exit(1);
}

const dataSource = fs.read(system.args[1])

function readRenderFile() {
  return fs.read('./render.html');
}

function replaceChartContent(content, json) {
  return content.replace('env.chartJson', JSON.stringify(json));
}

function writeToTmpFile(content) {
  const tmpDir = './tmp'
  const fileName = tmpDir + '/' + Date.now() + '.html';

  fs.makeDirectory(tmpDir);
  fs.write(fileName, content, 'w');

  return fileName;
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

const htmlFile = createRenderFile(dataSource);

page.open(htmlFile, function(status) {
  if (status === 'fail') {
    console.log('Error! failed to open ' + htmlFile);
    exit(1);
  }

  page.onCallback = function(data) {
    console.log(data);
    exit(0, htmlFile);
  }

  page.onError = function(error) {
    console.log(error);
    exit(1, htmlFile);
  }
});

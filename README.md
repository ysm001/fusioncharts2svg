## Fusioncharts to SVG
This is a Node library that allows you to generate SVG images of your [Fusioncharts](http://www.fusioncharts.com/) on the server, without even rendering the chart in the browser.

### installation

```
npm install --save fusioncharts2svg
```

### Running via node
First, include module:

```js
var fc2svg = require('fusioncharts2svg');
```

Then, you can make SVG image from fusioncharts object:

```js
fc2svg.fromObject({
  type: 'column2d',
  width: '550',
  height: '350',
  dataFormat: 'json',
  dataSource: {
    "chart": {
      "caption": "Monthly revenue for last year",
      "subCaption": "Harry's SuperMart",
      "xAxisName": "Month",
      "yAxisName": "Revenues (In USD)",
      "numberPrefix": "$",
      "paletteColors": "#0075c2",
      "bgColor": "#ffffff",
      "borderAlpha": "20",
      "canvasBorderAlpha": "0",
      "usePlotGradientColor": "0",
      "plotBorderAlpha": "10",
      "placevaluesInside": "1",
      "rotatevalues": "1",
      "valueFontColor": "#ffffff",                
      "showXAxisLine": "1",
      "xAxisLineColor": "#999999",
      "divlineColor": "#999999",               
      "divLineIsDashed": "1",
      "showAlternateHGridColor": "0",
      "subcaptionFontBold": "0",
      "subcaptionFontSize": "14"
    },            
    "data": [
    {
      "label": "Jan",
      "value": "420000"
    }, 
    {
      "label": "Feb",
      "value": "810000"
    }, 
    {
      "label": "Mar",
      "value": "720000"
    }, 
    {
      "label": "Apr",
      "value": "550000"
    }, 
    {
      "label": "May",
      "value": "910000"
    }, 
    {
      "label": "Jun",
      "value": "510000"
    }, 
    {
      "label": "Jul",
      "value": "680000"
    }, 
    {
      "label": "Aug",
      "value": "620000"
    }, 
    {
      "label": "Sep",
      "value": "610000"
    }, 
    {
      "label": "Oct",
      "value": "490000"
    }, 
    {
      "label": "Nov",
      "value": "900000"
    }, 
    {
      "label": "Dec",
      "value": "730000"
    }
    ],
    "trendlines": [
    {
      "line": [
      {
        "startvalue": "700000",
        "color": "#1aaf5d",
        "valueOnRight": "1",
        "displayvalue": "Monthly Target"
      }
      ]
    }
    ]
  }
}).then((svg) => {
  // Do something with svg data
}).catch((error) => {
  // Handling error 
});
```

or from fusioncharts file:

```js
fc2svg.fromFile(<path-to-your-fusioncharts-file>).then((svg) => {
  // Do something with svg data
}).catch((error) => {
  // Handling error
});
```

See also: [examples](https://github.com/ysm001/fusioncharts2svg/tree/master/examples)

#### 3. Running
You can also run fusioncharts2svg on console.
First, you need to download [PhantomJS](http://phantomjs.org/) and put it in PATH somewhere.

Then, you can run fusioncharts2svg on console:

```
phantomjs bin/fushioncharts2svg.js <path-to-your-fusioncharts-file>
```

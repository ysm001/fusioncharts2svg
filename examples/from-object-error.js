const fc2svg = require('../lib/index.js');

fc2svg.fromObject({
  type: 'line',
  width: '500',
  height: '300',
  dataFormat: 'json',
  dataSource: {
    "chart": {
    },
    "data": [
    ],
    "trendlines": [
    {
      "line": [
      {
        "startvalue": "18500",
        "color": "#1aaf5d",
        "displayvalue": "Average{br}weekly{br}footfall",
        "valueOnRight" : "1",
        "thickness" : "2"
      }
      ]
    }
    ]
  }
}).then((svg) => {
  console.log(svg);
}).catch((error) => {
  console.log(error);
});

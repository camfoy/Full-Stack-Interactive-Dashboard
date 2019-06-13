function buildGauge() {
    // Enter a speed between 0 and 180
    var level = response.WFREQ * 20;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'washes',
        text: level,
        hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
                '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(140, 175, 32, .5)',
                            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(205, 207, 120, .5)',
                            'rgba(210, 206, 145, .5)', 'rgba(221, 216, 173, .5)' ,'rgba(232, 226, 202, .5)',
                            'rgba(255, 255, 255, 0)']},
    labels: ['Sparkly Clean!', 'Why even wear a shirt?', 'Are you single?', 'You probably smell amazing.', "Now that's a nice button!", 'Try using a loofa!', 'For some reason this is normal.', 'Wash your belly, please.', 'If you or a loved one has been diagnosed with Mesothelioma you may to be entitled to financial compensation.', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week',
    height: 725,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

Plotly.newPlot('myDiv', data, layout);
}
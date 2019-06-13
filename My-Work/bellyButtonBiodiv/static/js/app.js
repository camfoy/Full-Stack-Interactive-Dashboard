async function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  let url = `/metadata/${sample}`;
  let response = await d3.json(url);

  let panel = d3.select("#sample-metadata");
  panel.html("");

  obj = Object.entries(response);
  obj.forEach( obj => {
    panel.append("p").text(obj[0] + ": " + obj[1])
  });

  // BONUS: Build the Gauge Chart
  function buildGauge() {
    
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
        text: response.WFREQ,
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
    labels: ['Sparkly Clean!', 'Why even wear a shirt?', 'Are you single?', 'You probably smell amazing.', "Now that's a nice button!", 'Try using a loofa!', 'For some reason this is normal.', 'Wash your belly, please.', 'But, why?', ''],
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
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot("gauge", data, layout);
  }

  buildGauge();
}

async function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let url = `/samples/${sample}`;
  let response = await d3.json(url);

  // @TODO: Build a Bubble Chart using the sample data
  function blowBubble() {
    let trace = {
      x: response.otu_ids,
      y: response.sample_values,
      text: response.otu_labes,
      mode: "markers",
      marker: {
        color: response.otu_ids,
        size: response.sample_values
      }
    };

    let data = [trace];

    let layout = {
      showlegend: false,
      height: 600,
      width: screen.width,
      title: "<b>Bacteria Prominence in Sample</b>",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Concentration of Bacteria"}
    };

    Plotly.newPlot("bubble", data, layout);
  }

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  function eatPie() {
    let data = [{
      values: response.sample_values.slice(0, 10),
      labels: response.otu_ids.slice(0, 10),
      type: "pie",
      hoverinfo: response.otu_labels.slice(0, 10)
    }];

    let layout = {
      title: "<b>Concentration by Bacteria ID</b>",
      height: 400,
      width: 400
    };

    Plotly.newPlot("pie", data, layout);
  }

  blowBubble();
  eatPie();
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

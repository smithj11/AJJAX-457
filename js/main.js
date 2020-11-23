var allDataGDP = [];
var allDataWorld = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {
    var url = "./../data/world-happiness-report-2015.csv"; 

    // TO-DO: LOAD DATA
    d3.csv(url)
        .then(function(data) {
            console.log(data)
            allDataGDP = data;

            //createVis();
        });
}


function createVis() {
    
}
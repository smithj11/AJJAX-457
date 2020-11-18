var allDataGDP = [];
var allDataWorld = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {
    // Hubway XML station feed
    //TODO: CHANGE THIS AFTER MILESTONE 1
    var url = "./../data/world-happiness-report-2015.csv"; //'https://member.bluebikes.com/data/stations/stations.json';

    // TO-DO: LOAD DATA
    d3.csv(url)
        .then(function(data) {
            //pass the instances of all the charts that update on selection change in YearChart
            console.log(data)
            allDataGDP = data;

            createVis();
        });
}


function createVis() {

    // TO-DO: INSTANTIATE VISUALIZATION
    var happiness_gdp = new WorldMapGDP("gdp-happiness-map", allDataGDP);

}
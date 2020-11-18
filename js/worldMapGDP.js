/*
 *  WorldMapGDP - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

WorldMapGDP = function(_parentElement, _data) {

    this.parentElement = _parentElement;
    this.data = _data;
    this.width = 700,
        this.height = 500;
    this.initVis();
}


/*
 *  Initialize station map
 */

WorldMapGDP.prototype.initVis = function() {
    var vis = this;

    vis.wrangleData();
}


/*
 *  Data wrangling
 */

WorldMapGDP.prototype.wrangleData = function() {
    var vis = this;

    // Currently no data wrangling/filtering needed
    // vis.displayData = vis.data;

    // Update the visualization
    vis.updateVis();

}


/*
 *  The drawing function
 */

WorldMapGDP.prototype.updateVis = function() {
    var vis = this;
    console.log("aAa");
    // Analyze the dataset in the web console
    console.log(vis.data);
    console.log("Countries: " + vis.data.length)

    //this is where I should deal with all stuff.

    //Convert numerical values to numbers


    vis.data.forEach(function(d) {
        //d["LifeExpectancy"] = +d["LifeExpectancy"]; // transform each d.value from str to int
        //d["Income"] = +d["Income"];
        //d["Population"] = +d["Population"];
        d["Happiness Rank"] = +d["Happiness Rank"];
        d["Happiness Score"] = +d["Happiness Score"];
        d["Standard Error"] = +d["Standard Error"];
        d["Economy (GDP per Capita)"] = +d["Economy (GDP per Capita)"];
        d["Family"] = +d["Family"];
        d["Health (Life Expectancy)"] = +d["Health (Life Expectancy)"];
        d["Freedom"] = +d["Freedom"];
        d["Trust (Government Corruption)"] = +d["Trust (Government Corruption)"];
        d["Generosity"] = +d["Generosity"];
        d["Dystopia Residual"] = +d["Dystopia Residual"];
    });


    let padding = 20;

    var svg = d3.select("#gdp-happiness-map")
        .append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height);

    var xScale = d3.scaleLinear() // scaleLinear is used for linear data
        .domain([d3.min(vis.data, function(d) { return d["Economy (GDP per Capita)"]; }) / 10, d3.max(vis.data, function(d) { return d["Economy (GDP per Capita)"]; }) * 12]) // input
        .range([padding / 2, vis.width]); // output


    var yScale = d3.scaleLinear() // scaleLinear is used for linear data
        .domain([d3.min(vis.data, function(d) { return d["Happiness Score"]; }) - 3, d3.max(vis.data, function(d) { return d["Happiness Score"]; }) + 3]) // input
        .range([vis.height - padding / 2, padding / 2]); // output




    let colorPalette = d3.scaleOrdinal(d3.schemePaired);

    colorPalette
        .domain(vis.data.map(function(d) {
            return d.Region;
        }))

    console.log(colorPalette.range());

    console.log(colorPalette.domain());

    console.log(colorPalette("South Asia"))
    console.log(colorPalette("America"))

    svg.selectAll("circle")
        .data(vis.data) // parse through our data
        .enter()
        .append("circle") // create place holder each data item and replace with rect
        .style("fill", function(d) { return "green"; /*colorPalette(d.Region);*/ })
        .style("stroke", "steelblue")
        .attr("cx", function(d) { return xScale(d["Economy (GDP per Capita)"]) * 10; }) // use xScale to find x position 
        .attr("cy", function(d) { return yScale(d["Happiness Score"]); }) // use yScale to find y position
        .attr("r", function(d) {
            console.log()
            return d["Happiness Score"] * 3;
        });

    console.log(xScale(50000))
    console.log(yScale(50))

    // Create an axis function specifying orientation (top, bottom, left, right)
    let xAxis = d3.axisBottom();

    // Pass in the scale function
    xAxis.scale(xScale)

    // Draw the axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (vis.height - 1.5 * padding) + ")")

    .call(xAxis)

    .append('text')
        .attr("fill", "black")
        .text('Economy (GDP per Capita)')
        .attr("x", 630)
        .attr("y", 0)


    let yAxis = d3.axisLeft();

    // Pass in the scale function
    yAxis.scale(yScale);

    // Draw the axis
    svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + (padding) + ",0)")
        .call(yAxis)

    .append('text')
        .attr("fill", "black")
        .text('Happiness Score')
        .attr("x", 80)
        .attr("y", 48);


}
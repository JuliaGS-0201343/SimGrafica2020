/*
*    main.js
*/

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;
var flag = true;
var g = d3.select("#chart-area")
  .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleLog().domain([142,150000]).range([0,width]).base(10);
var y = d3.scaleLinear().domain([0,90]).range([height,0]);
var t = d3.transition().duration(1000);
var area = d3.scaleLinear().domain([2000, 1400000000]).range([25*Math.PI, 1500*Math.PI]);
//static part of axis scales
var xAxisCall = d3.axisBottom(x).tickValues([400,4000,40000]).tickFormat(d3.format("$"));
var yAxisCall = d3.axisLeft(y);

// X & Y scale generators
var xAxisGroup = g.append("g").attr("class", "x axis")
.attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "y-axis");

var legend = g.append("g")
 .attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");
	g.append("g")
 	.attr("class", "x axis")
 	.attr("transform", "translate(0, " + height + ")")
 	.call(xAxisCall)
 	.selectAll("text")
 	.attr("y", 10)
 	.attr("x", -5)
 	.attr("text-anchor", "middle");
 	g.append("g")
 	.attr("class", "left axis")
 	.call(yAxisCall);
 	// X Label
 	g.append("text")
 	.attr("class", "x axis-label")
 	.attr("x", width/2)
 	.attr("y", height + 50)
 	.attr("font-size", "20px")
 	.attr("text-anchor", "middle")
 	.text("GDP Per Capita ($)");
 	// Y Label
 	g.append("text")
 	.attr("class", "y axis-label")
 	.attr("x", - (height / 2))
 	.attr("y", -60)
 	.attr("font-size", "20px")
 	.attr("text-anchor", "middle")
 	.attr("transform", "rotate(-90)")
 	.text("Life expectancy (Years)");
 	// Area Label
 	var areaLabel = g.append("text")
 	.attr("class", "x axis-label")
 	.attr("x", width-20)
 	.attr("y", height-10)
 	.attr("font-size", "20px")
 	.attr("text-anchor", "middle")
 	.text("Year");
var continents = new Array();
d3.json("data/data.json").then(function(data){
	data.forEach((d, i)=>{
			d.year = +d.year;
      });

	//console.log(data);
	const formattedData = data.map((year) => {
	return year["countries"].filter((country) => {
		var dataExists = (country.income && country.life_exp);
		return dataExists
	}).map((country) => {
		country.income = +country.income;
		country.life_exp = +country.life_exp;
		return country;
	})
});

	var years = data.map((d) => {return d.year;});
	var cont = formattedData[0].map((d) => {return d.continent;});
	var continents = [...new Set(cont)];
	var yearListlength = years.length;
	var currentYearIdx = 0;

	d3.interval( ( )=>{
	if (currentYearIdx >= yearListlength){
		currentYearIdx = 0;
	}
	update(years[currentYearIdx], formattedData[currentYearIdx], continents);
	currentYearIdx++;

}, 1000);
}).catch((error)=> {
console.log(error);
});

function update(year, data, continents){
	var label = year;
  areaLabel.text(label);
	var myColor = d3.scaleOrdinal().domain(continents).range(d3.schemePastel1);
	continents.forEach((c, i) => {
			var legendRow = legend.append("g")
			.attr("transform", "translate(0, " + (i * 20) + ")");
			legendRow.append("rect")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", myColor(c));
	 		legendRow.append("text")
			.attr("x", -10)
			.attr("y", 10)
			.attr("text-anchor", "end")
			.style("text-transform", "capitalize")
			.text(c);
	 });
	var circles = g.selectAll("circle").data(data, (d) => { return d.country; });
	circles.exit().attr("fill", (d) => {return myColor(d.continent);})
    .transition(t)
    .attr("cy", (d) => {return y(d.life_exp);})
    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
    .remove();
	circles.transition(t)
    .attr("cx", (d) => {return x(d.income);})
    .attr("cy", (d) => {return y(d.life_exp);})
    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});
  circles.enter().append("circle")
    .attr("fill", (d) => {return myColor(d.continent);})
    .attr("cx", (d) => {return x(d.income);})
    .attr("cy", (d) => {return y(d.life_exp);})
    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);})
    .merge(circles)
    .transition(t)
		.attr("cx", (d) => {return x(d.income);})
    .attr("cy", (d) => {return y(d.life_exp);})
    .attr("r", (d)=>{return Math.sqrt(area(d.population) / Math.PI);});
}

/*
*    main.js
*/

d3.json("data/buildings.json").then((data) => {
  //console.log(data);
  var heights = [];
  var countries = [];
  data.forEach((d)=>{
  		d.height = +d.height;
      heights.push(d.height);
      countries.push(d.name);
  	});
  //Scales
  var myColor = d3.scaleOrdinal().domain(countries)
  .range(d3.schemeSet3);
  var x = d3.scaleBand().domain(countries).range([0,400]).paddingInner(0.3).paddingOuter(0.3);
  var y = d3.scaleLinear().domain([828,0]).range([0, 400]);
  //bottomAxis
  var bottomAxis = d3.axisBottom(x);

  g.append("g")
  	.attr("class", "bottom axis")
  	.attr("transform", "translate(0, " + height + ")")
  	.call(bottomAxis)
    .selectAll("text")
    	.attr("y", "7")
    	.attr("x", "-3")
    	.attr("text-anchor", "end")
    	.attr("transform", "rotate(-40)");

  //leftAxis
  var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d + "m"; });

  g.append("g")
   .attr("class", "left axis")
   .call(leftAxis);

  // Y Label
   g.append("text")
   	.attr("class", "y axis-label")
   	.attr("x", - (height / 2))
   	.attr("y", -60)
   	.attr("font-size", "20px")
   	.attr("text-anchor", "middle")
   	.attr("transform", "rotate(-90)")
   	.style("fill","black")
   	.text("Height (m)");

  // X Label
   g.append("text")
   	.attr("class", "x axis-label")
   	.attr("x", width/2 - 100)
   	.attr("y", height+140)
   	.attr("font-size", "20px")
   	.attr("text-anchor", "middle")
   	.style("fill","black")
   	.text("The world's tallest buildings");

  d3.select("g")
  .selectAll("rect")
    .data(heights)
    .enter()
    .append("rect")
      .attr("x", (d,i)=>{
  			return(x(countries[i]));
  		})
      .attr("y",  (d)=>{return y(d);})
      .attr("width", x.bandwidth())
  		.attr("height", (d)=>{return height-y(d);})
  		.style("fill",function(d){return myColor(d);});
}).catch((error)=> {
console.log(error);
});

var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;

var g = d3.select("#chart-area")
  .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

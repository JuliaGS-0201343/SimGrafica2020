/*
*    main.js
*/

d3.json("data/buildings.json").then((data) => {
  console.log(data);
  var heights = [];
  var countries = [];
  data.forEach((d)=>{
  		d.height = +d.height;
      heights.push(d.height);
      countries.push(d.name);
  	});

  var myColor = d3.scaleOrdinal().domain(countries)
  .range(d3.schemeSet3);
  var x = d3.scaleBand().domain(countries).range([0,400]).paddingInner(0.3).paddingOuter(0.3);
  var y = d3.scaleLinear().domain([0,828]).range([0, 400]);

  d3.select("svg")
  .selectAll("rect")
    .data(heights)
    .enter()
    .append("rect")
      .attr("x", (d,i)=>{
  			return(x(countries[i]));
  		})
  		.attr("y",  (d,i)=>{
  			return(y(400))+(y(400)-y(d));
  		})
      .attr("width", x.bandwidth())
  		.attr("height", (d)=>{return y(d);})
  		.style("fill",function(d){return myColor(d)});
}).catch((error)=> {
console.log(error);
});

var svg = d3.select("#chart-area").append("svg")
  .attr("width", 500)
  .attr("height", 500);

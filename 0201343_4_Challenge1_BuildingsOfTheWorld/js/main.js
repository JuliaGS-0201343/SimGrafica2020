/*
*    main.js
*/

d3.json("data/buildings.json").then((data) => {
  console.log(data);
  var heights = [];
  data.forEach((d)=>{
  		d.height = +d.height;
      heights.push(d.height);
  	});

  var myColor = d3.scaleOrdinal().domain(data)
  .range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]);

  d3.select("svg")
  .selectAll("rect")
    .data(heights)
    .enter()
    .append("rect")
      .attr("x", (d,i)=>{
  			return(i*50)+25;
  		})
  		.attr("y",  (d,i)=>{
  			return(400)+(400-d);
  		})
      .attr("width", 40)
  		.attr("height", (d)=>{return d;})
  		.style("fill",function(d){return myColor(d) });
}).catch((error)=> {
console.log(error);
});

var svg = d3.select("#chart-area").append("svg")
  .attr("width", 800)
  .attr("height", 800);

/*
*    main.js
*/
/*
d3.csv("data/ages.csv").then((data) => {
	console.log(data);
});
d3.tsv("data/ages.tsv").then((data)=> {
	console.log(data);
});
*/

d3.json("data/ages.json").then((data) => {
  var ages = [];
  data.forEach((d)=>{
  		d.age = +d.age;
      ages.push(d.age);
  	});

  d3.select("svg")
  .selectAll("circle")
    .data(ages)
    .enter()
    .append("circle")
      .attr("cx", (d,i)=>{
  			return(i*50)+25;
  		})
  		.attr("cy", 250)
  		.attr("r", (d)=>{return d;})
  		.style("fill",function(d){
        if (d<10)
        {
          return d3.color("steelblue");
        }else{
          return d3.color("red");
        }
        });

}).catch((error)=> {
console.log(error);
});

var svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400);

/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);
var data = [25, 20, 15, 10, 5];
var rects = svg.selectAll("rect")
	.data(data);
var myColor = d3.scaleLinear().domain([1,30])
	 .range(["white", "blue"]);
rects.enter()
	.append("rect")
		.attr("x", (d,i)=>{
			return(i*50)+25;
		})
		.attr("y", (d)=>{
			return 50+(50-d);
		})
		.attr("width", 40)
		.attr("height", (d)=>{return d;})
		.attr("fill",function(d){return myColor(d) });

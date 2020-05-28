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
//static part of axis scales
var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);
var xAxisCall = d3.axisBottom(x);
var yAxisCall = d3.axisLeft(y).ticks(11).tickFormat((d) => { return "$"+d/1000 + "K"; });
// X & Y scale generators
var xAxisGroup = g.append("g").attr("class", "x axis")
.attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "y-axis");

// Y Label
var yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .style("fill","black")
  .text("Revenue (dlls.)");

// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width/2 - 100)
  .attr("y", height+50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .style("fill","black")
  .text("Month");

d3.json("data/revenues.json").then((data) => {
  data.forEach((d)=>{
    d.revenue = +d.revenue;
    d.profit= +d.profit;
  });

      d3.interval( ( ) => {
        //console.log("Hello World");
        update(data);
        flag = !flag;
      }, 1000);
update(data);

}).catch((error)=> {
console.log(error);
});

function update(data) {
  var value = flag ? "revenue" : "profit";
  var label = flag ? "Revenue (dlls.)" : "Profit (dlls.)";
  yLabel.text(label);
  //Scales
  var myColor = d3.scaleLinear().domain([0,7])
     .range(["white", "blue"]);

  //dynamic part of axis scales
  x.domain(data.map((d) => { return d.month; }));
  y.domain([0, d3.max(data, (d) => { return d[value] })]);

  //bottomAxis
  xAxisGroup.call(xAxisCall);
  yAxisGroup.call(yAxisCall);

  //binding data
  var bars = g.selectAll("rect").data(data)
    bars.exit().remove();
  bars.attr("x", (d) => { return x(d.month); })
	.attr("y", (d) => { return y(d[value]); })
	.attr("width", x.bandwidth)
	.attr("height",(d) => { return height - y(d[value])});

    bars.enter().append("rect")
      .attr("x",(d) => {return x(d.month);})
      .attr("y", (d) => { return y(d[value]); })
      .attr("width", x.bandwidth)
      .attr("height",(d) => {return height - y(d[value]);})
      .attr("fill",function(d){return myColor(d);});

}

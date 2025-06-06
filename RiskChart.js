function drawRiskChart(worth, element) {
    d3.selectAll(element +" > *").remove();

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    function percentage(chance) {
        return chance / 100;
    }

    console.log("adjusted Worth!");


    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .tickFormat(function(d) { return d + "%"; })
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d);
        })
        .y(function (d) {
            return y(worth * percentage(d));
        });

    var svg = d3.select("#risk").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(d3.extent(data, function (d) {
        return d;
    }));
    y.domain(d3.extent(data, function (d) {
        return worth * percentage(d);
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Expected Value of Equity ($)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
};

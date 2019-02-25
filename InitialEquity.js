

function renderChart(data, element, height) {

    console.log("Data", data);
    //d3.select("svg").remove();
    //d3.select("svg").remove();

    d3.selectAll(element +" > *").remove();

    var width = 250,
        height = 250,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["darkgrey", "yellow" , "black", "purple", "orange"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            console.log("D",d);
            return d.percent;
        });

    var svg = d3.select(element).append("svg")
        .attr("id", element + "svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function (d) {
        d3.select("#tooltipD3")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .select("#value")
            .text(d.data.text + ": " + "%" + d.data.value);
        })
        .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#tooltipD3")
                .style("opacity", 0);
        });

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d,i) {
            return color(i);
        });

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function (d) {
            console.log("d", d);
            return d.data.percent + "%";
        });


    function type(d) {
        d.percent = +d.percent;
        return d;
    }

};
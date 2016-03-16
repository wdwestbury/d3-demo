// select the body when the window is loaded
window.onload = function()
{
	// container data
	var container = d3.select("body")
			.append("svg")
			.attr("width", 900) // why the hell carl put w & h in a variable beats me. these are not being changed/accessed anywhere else
			.attr("height", 500)
			.attr("class", "container");

	// inner rectangle
	var innerRect = container.append("rect")
			.datum(400)
 			.attr("width", function(d)
 			{ 
            	return d * 2; // width = 800
        	})
        	.attr("height", function(d)
        	{ 
            	return d; // height = 400
        	})
        	.attr("class", "innerRect") 
        	.attr("x", 50) 
        	.attr("y", 50) 
        	.style("fill", "#FFFFFF"); 


    // population data for the circles
	var cityPop = [
	    { 
	        city: 'Minneapolis',
	        population:	382578
	    },
	    {
	        city: 'Billings',
	        population: 104170
	    },
	    {
	        city: 'Denver',
	        population: 663862
	    },
	    {
	        city: 'Sandusky',
	        population: 25793
	    }
	];

    // get min value of the array
    var minPop = d3.min(cityPop, function(d)
    {
        return d.population;
    });

    // get max value of the array
    var maxPop = d3.max(cityPop, function(d)
    {
        return d.population;
    });

    // color styles
    var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain
        ([
            minPop, 
            maxPop
        ]);

    // create a scale
    var x = d3.scale.linear() 
        .range([90, 700]) // output min and max
        .domain([0, 3]); // input min and max

    // scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([450, 50]) 
        .domain([0, 800000]); 

    // create format generator
    var format = d3.format(",");

    // create labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d)
        {
            return y(d.population) + 5;
        });

    // first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i)
        {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d)
        {
            return d.city;
        });

    // second line of the lable
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i)
        {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") // vertical offset
        .text(function(d)
        {
            return "Pop. " + format(d.population); // format numbers with generator
        });

    // create y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    // add the axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

    // create the titele
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

	// create circles
    var circles = container.selectAll(".circles") 
        .data(cityPop) 
        .enter() 
        .append("circle") 
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d)
        {
            var area = d.population * 0.01; // calculate circle radius based on population
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i)
        {
            return x(i); //use the scale generator with the index to place each circle horizontally
        })
        .attr("cy", function(d)
        {
            return y(d.population);
        })
        .style("fill", function(d, i)
        { 
            return color(d.population); //add a fill based on the color scale generator
        })
        .style("stroke", "#000"); //black circle stroke

}


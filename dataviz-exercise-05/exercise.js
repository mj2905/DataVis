


/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };

function getMinDateFromData(dataset) {

	const min = new Date(d3.min(dataset, d => d['Date'].getTime()));
	if (typeof min === 'undefined') {
		return new Date(1970, 1, 1);
	}
	return min;
}

function getMaxDateFromData(dataset) {

	const max = new Date(d3.max(dataset, d => d['Date'].getTime()));
	if (typeof max === 'undefined') {
		return new Date(1970, 1, 1);
	}
	return max;
}

whenDocumentLoaded(() => {

	let svg = d3.select('svg');
	let width = svg.attr('width') - MARGIN.left - MARGIN.right;
	let height = svg.attr('height') - MARGIN.top - MARGIN.bottom;

	let xOffset = 10;

	let xScale = dataset => d3.scaleTime()
	.domain([getMinDateFromData(dataset), getMaxDateFromData(dataset)])
	.range([xOffset, width - xOffset]);

	svg = svg.append('g')
	.attr('transform', 'translate(' + MARGIN.left + ' ' + MARGIN.top + ')');

	d3.csv('climate_temperature_month_avg.csv', function(data) {

		//Beware : there is a space before month
		data['Date'] = new Date(data['Year'], +data[' Month'] - 1);
		delete data['Year'];
		delete data[' Month'];
		return data;
	}).then(function(dataset) {

		svg.selectAll('.node')
		.data(dataset)
		.enter()
		.append('text')
		.attr('dx', d => xScale(dataset)(d['Date']))
		.attr('dy', 20)
		.attr('class', 'node')
		.text(function(d) {
			return d[' Month'];
		});

	});


});

class MultiScatterPlot {
	constructor(dataset) {
		this.dataset = dataset;
	}
}

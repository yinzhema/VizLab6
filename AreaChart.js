

export default function AreaChart(container){
	

	const margin = ({top: 40, right: 20, bottom: 24, left: 100})
	const width=750-margin.left-margin.right,
	  height=150-margin.top-margin.bottom

	const listeners={brushed:null,brushended:null}

	let svg=d3.select(container).append('svg')
		.attr('width',width+margin.left+margin.right)
		.attr('height',height+margin.top+margin.bottom)
		.append('g')
		.attr('transform','translate('+margin.left+','+margin.top+')')

	let xScale=d3.scaleTime()
		.range([0,width])
	
	let yScale=d3.scaleLinear()
		.range([height,0])

	svg.append('path')
		.attr('class','areaChartClass')
	
	let xAxis=d3.axisBottom()
		.scale(xScale)
	
	let yAxis=d3.axisLeft()
		.scale(yScale)
		.ticks(3)

	svg.append('g')
		.attr('class','x-axis')
	svg.append('g')
		.attr('class','y-axis')
	
	const brush=d3.brushX()
		.extent([[0,0],[width,height]])
		.on('brush',brushed)
		.on('end',brushed)
	
	svg.append("g").attr('class', 'brush').call(brush);

	
	function brushed(event) {
		if (event.selection) {
			listeners['brushed'](event.selection.map(xScale.invert))
		}
	}

	function brushended(event){
		if(!event.selection){
			listeners['brushended'](event.selection)
		}
	}

	function update(data){

		xScale.domain(d3.extent(data,d=>d.date))
		yScale.domain([0,d3.max(data,d=>d.total)])

		var area=d3.area()
			.x(d=>xScale(d.date))
			.y1(d=>yScale(d.total))
			.y0(d=>yScale(0))

		d3.select('.areaChartClass')
			.datum(data)
			.attr('fill','steelblue')
			.attr('d',area)
	
		svg.select('.x-axis')
			.call(xAxis)
			.attr('transform',`translate(0,${height})`)
		
		svg.select('.y-axis')
			.call(yAxis)
			//.attr('transform',`translate(0,100)`)
	
	}

	function on(event,listener){
		listeners[event]=listener
	}

	return{
		update,
		on
	}
}
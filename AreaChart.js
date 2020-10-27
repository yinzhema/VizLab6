const margin = ({top: 20, right: 20, bottom: 20, left: 20})
const width=750-margin.left-margin.right,
	  height=500-margin.top-margin.bottom

export function AreaChart(container){

	const svg=d3.select(container).append('svg')
		.attr('width',width+margin.left+margin.right)
		.attr('height',height+margin.top+margin.bottom)
		.append('g')
		.attr('transform','translate('+margin.left+','+margin.top+')')

	const xScale=d3.scaleTime()
		.range([50,width])
	
	const yScale=d3.scaleLinear()
		.range([0,height])

	svg.append('path')
		.attr('class','.areaChartClass')
	
	const xAxis=d3.axisBottom()
		.scale(xScale)
	
	const yAxis=d3.axisLeft()
		.scale(yScale)

	function update(data){
		xScale.domain([0,d3.max(data,d=>d.date)])
		yScale.domain([0,d3.max(data,d=>d.total)])
		area=d3.area()
			.x(d=>x(d.date))
			.y1(d=>y(d.total))
			.y0(d=>y(0))
		svg.select('.areaChartClass')
			.datum(data)
			.attr('fill','steelblue')
			.attr('d',area)
	
		svg.select('.x-axis')
			.call(xAxis)
		
		svg.select('.y-axis')
			.call(yAxis)
	
	}

	return{
		update: update
	}
}

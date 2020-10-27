const margin = ({top: 20, right: 20, bottom: 20, left: 20})
const width=750-margin.left-margin.right,
	  height=500-margin.top-margin.bottom

export function StackedAreaChart(container){
	const svg=d3.select(container).append('svg')
		.attr('width',width+margin.left+margin.right)
		.attr('height',height+margin.top+margin.bottom)
		.append('g')
		.attr('transform','translate('+margin.left+','+margin.top+')')

	const xScale=d3.scaleTime()
		.range([50,width])
	
	const yScale=d3.scaleLinear()
		.range([0,height])
	
	const colorScale=d3.scaleOrdinal(d3.schemeTableau10)

	const xAxis=d3.axisBottom()
		.scale(xScale)
		
	const yAxis=d3.axisLeft()
		.scale(yScale)
	
	const tooltip=svg.append('text')

	function update(data){
		var stack=d3.stack()
			.keys(['Agriculture','Business services','Construction','Education and Health','Finance',
				'Government','Information','Leisure and hospitality','Manufacturing','Mining and Extraction','Other','Self-employed',
				'Transportation and Utilities','Wholesale and Retail Trade'])
			.order(d3.stackOrderNone)
			.offset(d3.stackOffsetNone)
		var series=stack(data)
		xScale.domain([0,d3.max(data,d=>d.date)])
		yScale.domain([0,d3.max(series,d=>d3.max(d,d[1]		
		))])
		const area=d3.area()
			.x(d=>xScale(d.date))
			.y0(d=>yScale(d[0]))
			.y1(d=>yScale(d[1]))
		const areas=svg.selectAll('.area')
			.data(series,d=>d.key)
		areas.enter()
			.append('path')
			.merge(areas)
			.attr('fill',d=>colorScale(d.key))
			.attr('d',area)
			.on('mouseover',(event,d,i)=>{
				tooltip.attr('x',0)
				.attr('y',0)
				.text('test')
			})
		areas.exit().remove()
		svg.select('.x-axis')
			.call(xAxis)
		
		svg.select('.y-axis')
			.call(yAxis)


	}

	return {
		update:update
	}
}

export default function StackedAreaChart(container){
	const margin = ({top: 20, right: 20, bottom: 20, left: 100})
	const width=750-margin.left-margin.right,
	  height=300-margin.top-margin.bottom
	
	let selected=null,xDomain,data;

	let svg=d3.select(container).append('svg')
		.attr('width',width+margin.left+margin.right)
		.attr('height',height+margin.top+margin.bottom)
		.append('g')
		.attr('transform','translate('+margin.left+','+margin.top+')')

	let xScale=d3.scaleTime()
		.range([0,width])
	
	let yScale=d3.scaleLinear()
		.range([height,0])
	
	let colorScale=d3.scaleOrdinal(d3.schemeTableau10)

	let xAxis=d3.axisBottom()
		.scale(xScale)
		
	let yAxis=d3.axisLeft()
		.scale(yScale)
	
	svg.append('g')
		.attr('class','x-axis')
	svg.append('g')
		.attr('class','y-axis')
	
	
	const tooltip=svg.append('text')

	function update(_data){
		data=_data
	const keys = selected? [selected] : data.columns.slice(1)
		var stack=d3.stack()
			.keys(keys)
			.order(d3.stackOrderNone)
			.offset(d3.stackOffsetNone)

		var series=stack(data)

		xScale.domain(xDomain? xDomain:d3.extent(data,d=>d.date))
		yScale.domain([0,d3.max(series,d=>d3.max(d,d=>d[1]))])
		
		var area=d3.area()
			.x(d=>xScale(d.data.date))
			.y0(d=>yScale(d[0]))
			.y1(d=>yScale(d[1]))

		const areas=svg.selectAll('.area')
			.data(series,d=>d.key)

		areas.enter()
			.append('path')
			.attr('d',area)
			.merge(areas)
			.attr('fill',d=>colorScale(d.key))
			.attr('d',area)
			.on('mouseover',function(event,d,i){
				tooltip.text(d.key)
			})
			.on('mouseout',function(event,d,i){
				tooltip.text('')
			})
			.on('click',(event,d)=>{
				if (selected===d.key){
					selected=null;
				} else{
					selected=d.key;
				}
				update(data)
			})

		areas.exit()
			.remove()

		svg.select('.x-axis')
			.call(xAxis)
			.attr('transform',`translate(0,${height})`)
		
		svg.select('.y-axis')
			.call(yAxis)

	}

	function filterByDate(range){
		xDomain=range;
		update(data);
	}

	return {
		update,
		filterByDate
	}
}
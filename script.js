import AreaChart from './AreaChart.js'
import StackedChart from './StackedAreaChart.js'

function sumHelper(sample){
	let sum=0;
	for ([key,value] of Object.entries(sample)){
		if(typeof value==='object') {
			
		} else{
			sum=sum+value;
		}
	}
	sample.total=sum
	return sample;
}


d3.csv('unemployment.csv',d3.autoType).then(data=>{
	// update(data,type,sort);

	// d3.select('#sort').on('click',()=>{
	// 	sort=!sort
	// 	console.log(sort)
	// 	update(data,type,sort)
	// })
	// d3.select('#group-by').on('change',(event)=>{
	// 	type=event.target.value;
	// 	update(data,type,sort);
	// })
	
	data=data.map(sumHelper)
	achart=StackedAreaChart()
	achart.update(data)
	

	
	
})



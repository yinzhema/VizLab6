import AreaChart from './AreaChart.js'
import StackedAreaChart from './StackedAreaChart.js'


d3.csv('unemployment.csv',d3.autoType).then(data=>{

	for (let i=0;i<data.length;i++){
		var sum=0
		for (const [key,value] of Object.entries(data[i])){

			if(typeof value==='object') {
				
			} else{
				sum=sum+value;
			}
		}
		data[i].total=sum
	}
	console.log(data)
	const stackedChart=StackedAreaChart(".chart-container1")
	stackedChart.update(data)
	const areaChart=AreaChart(".chart-container2")
	areaChart.update(data)
	areaChart.on('brushed',(range)=>{
		stackedChart.filterByDate(range)
	})
	areaChart.on('brushended',(range)=>{
		stackedChart.filterByDate([d3.min(data,d=>d.date),d3.max(data,d=>d.date)])
	})


	

	
	
})



import btnClick from './btnClick.js';

const totalComponent = 2;
const items = 
	[
  		{
			"content": "simple-card-a",
  			"locked": "yes",
			"w": 10, 
			"h": 5,
			"x": 20,
			"y": 5,
			"subGridOpts":{
				"children":[
  					{
    					"content": "btn-ok-a",
    					"w": 5,
    					"h": 5,
    					"locked": "yes",
    					"x": 1,
    					"y": 1
  					},
				]
			}
		}
  	]

async function load(self){
	await btnClick(self);
}

export { totalComponent, items, load }

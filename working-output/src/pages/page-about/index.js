import BasePage from '../base-page/index.js';

export default class extends BasePage {
	constructor(){
		super();
	}

	totalComponent = 2;
	items = 
		[
  			{
				"content": "simple-card",
  				"locked": "yes",
				"w": 10, 
				"h": 5,
				"x": 5,
				"y": 5,
				"subGridOpts":{
					"children":[
  						{
    						"content": "btn-to-home",
    						"w": 5,
    						"h": 5,
    						"locked": "yes",
    						"x": 1,
    						"y": 1
  						},
					]
				}
			}
  		];

	async registerElement(){
		const self = this;

		await self.ui.registerElement({ type: 'components', name: 'btn-to-home', id: 'btn-to-home' });
		await self.ui.registerElement({ type: 'components', name: 'simple-card', id: 'simple-card' });

		await self.ui.registerElement({ type: 'components', name: 'DrawerBox', id: 'drawer-box' });
	}

	async onInit(){
		const self = this;

		await self.registerElement();

		await self.loadWrapper();
	}
}

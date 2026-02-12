import router from '../../models/router.js';
import ui from '../../models/ui.js';

import btnClick from './btnClick.js';

class PageHome extends HTMLElement {
	constructor(){
		super();
	}

	totalComponent = 2;

	createWrapper(){
		const self = this;
		const wrapper = document.createElement('div');
		wrapper.classList.add('h-screen');

		const items = 
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
    							"content": "btn-ok",
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

		self.drawerBox = document.createElement('drawer-box');
		self.drawerBox.setData({
			totalComponent: self.totalComponent,
			items
		});
		wrapper.append(self.drawerBox);

		return wrapper;
	}


	checkNotif(){
		const flag = ui.getFlag();
		if(flag?.notification){
			new Notify(flag.notification);
		}
	}

	async onLoad(){
		const self = this;

		self.grid = self.drawerBox._grid;

		await btnClick(self);
	}

	connectedCallback(){
		const self = this;

		const wrapper = self.createWrapper();

		self.append(wrapper);

		self._listeners = {
			'all-loaded': () => {

				// run it at next tick
				setTimeout(() => {
					self.onLoad();
				}, 0);
			}
		}

		for(let key in self._listeners){
			ui.addEventListener(key, self._listeners[key]);
		}
	}

	disconnectedCallback(){
		const self = this;

		for(let key in self._listeners){
			ui.removeEventListener(key, self._listeners[key]);
		}
	}
}

export default window.customElements.define(
    'page-home',
    PageHome
)

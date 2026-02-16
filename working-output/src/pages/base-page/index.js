import router from '../../models/router.js';
import ui from '../../models/ui.js';

export default class extends HTMLElement {
	constructor(){
		super();
	}

	router = router;
	ui = ui;

	totalComponent = 0;
	items = [];

	listeners = {
		'all-loaded': () => {
			const self = this;

			// run it at next tick
			setTimeout(() => {
				self.onLoad();
			}, 0);
		}
	}

	createWrapper(){
		const self = this;
		const wrapper = document.createElement('div');
		wrapper.classList.add('h-screen');

		self.drawerBox = document.createElement('drawer-box');
		self.drawerBox.setData({
			totalComponent: self.totalComponent,
			items: self.items
		});
		wrapper.append(self.drawerBox);

		return wrapper;
	}


	checkNotif(){
		const self = this;

		const flag = self.ui.getFlag();
		if(flag?.notification){
			new Notify(flag.notification);
		}
	}

	async onLoad(){
		const self = this;

		self.grid = self.drawerBox._grid;
	}

	loadWrapper(){
		const self = this;

		const wrapper = self.createWrapper();

		self.append(wrapper);
	}

	connectedCallback(){
		const self = this;

		if (self.onInit) self.onInit(); 

		for(let key in self.listeners){
			self.ui.addEventListener(key, self.listeners[key]);
		}
	}

	disconnectedCallback(){
		const self = this;

		if (self.onDestroy) self.onDestroy();

		for(let key in self.listeners){
			self.ui.removeEventListener(key, self.listeners[key]);
		}
	}
}

import router from '../../models/router.js';
import ui from '../../models/ui.js';

/* import layout */
/* end of import layout */

/* import js script */
/* end of import js script */

class PageTemplate extends HTMLElement {
	constructor(){
		super();
	}

	createWrapper(){
		const self = this;
		const wrapper = document.createElement('div');
		wrapper.classList.add('h-screen');

		let totalComponent = TOTAL_COMPONENTS || 0;
		const items = 
			LIST_COMPONENTS
			|| [];

		/* add layout attribute */
		/* end of add layout attribute */

		self.drawerBox = document.createElement('drawer-box');
		self.drawerBox.setData({
			totalComponent: totalComponent,
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
		self.ui = ui;
		self.router = router;

		/* call layout script */
		/* end of call layout script */

		/* call js script */
		/* end of call js script */
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
    'page-template',
    PageTemplate
)

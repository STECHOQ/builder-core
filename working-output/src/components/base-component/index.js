import ui from '../../models/ui.js';
import router from '../../models/router.js';

export default class extends HTMLElement {
    constructor() { 
    	super(); 
    }

    listeners = {}

    ui = ui;
    router = router;

	async loadHTML(html){
		const self = this;

		if(html){
			self.innerHTML = html;
		}
	}

    async connectedCallback() {
    	const self = this;

        if (self.onInit) self.onInit(); 

		for(let key in self.listeners){
			self.ui.addEventListener(key, self.listeners[key]);
		}
    }

    disconnectedCallback() {
    	const self = this;

        if (self.onDestroy) self.onDestroy();

		for(let key in self.listeners){
			self.ui.removeEventListener(key, self.listeners[key]);
		}
    }
}

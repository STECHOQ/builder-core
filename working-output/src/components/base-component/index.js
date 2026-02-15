export default class extends HTMLElement {
    constructor() { 
    	super(); 
    }

    listeners = {}

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
			ui.addEventListener(key, self.listeners[key]);
		}
    }

    disconnectedCallback() {
    	const self = this;

        if (self.onDestroy) self.onDestroy();

		for(let key in self.listeners){
			ui.removeEventListener(key, self.listeners[key]);
		}
    }
}

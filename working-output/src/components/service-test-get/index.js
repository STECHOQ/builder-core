import ui from '../../models/ui.js';
import router from '../../models/router.js';

class ELEMENT extends HTMLElement {
    constructor(){
        super();
	}

	createWrapper(){
		const self = this;

		return;
	}

	async loadComponent(){
		const self = this;

		const response = await fetch(`/components/service-test-get/index.html`)
		if(response.ok){
			const html = await response.text();
			self.innerHTML = html;
		}

		return true;
	}

    connectedCallback(){
        const self = this;

		self._listeners = {}

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
    'service-test-get', ELEMENT
)

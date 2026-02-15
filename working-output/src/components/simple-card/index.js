import ui from '../../models/ui.js';
import router from '../../models/router.js';
import html from './index.html?raw';

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

		if(html){
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

 window.customElements.define(
    'simple-card', ELEMENT
)

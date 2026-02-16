import BaseComponent from '../base-component/index.js';

import html from './index.html?raw';

export default class extends BaseComponent {
    constructor(){
        super();
	}

	onInit(){
		const self = this;

		self.loadHTML(html);

		self.counter = 0;

		self.addEventListener('click', () => {
			self.router.go('/home');
		})
	}
}

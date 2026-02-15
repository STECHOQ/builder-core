import ui from '../../models/ui.js';
import router from '../../models/router.js';

import BaseComponent from '../base-component/index.js';

import html from './index.html?raw';

export default class extends BaseComponent {
    constructor(){
        super();
	}

	onInit(){
		const self = this;

		self.loadHTML(html);
	}
}

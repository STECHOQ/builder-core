import BaseComponent from '../base-component/index.js';

export default class extends BaseComponent {
    constructor(){
        super();
	}

	listeners = {
		'click-ok': ({ detail }) => {
			new Notify ({
    			status: 'success',
    			title: 'OK',
    			text: `${JSON.stringify(detail)}`,
			})
		}
	}

	onInit(){
		const self = this;
	}
}

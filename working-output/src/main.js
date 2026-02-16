// PLEASE DON'T CHANGE EVERYTHING BETWEEN '/* ... */' blabla '/* end of ... */'

/* js components */
/* end of js components */

/* js components plugin */
/* end of js components plugin */

import router from './models/router.js';
import ui from './models/ui.js';

const rawMainEl = document.getElementsByTagName('main-element');
const main = rawMainEl[0];

const routes = {
	'/': {
		redirect: "/home"
	},

	/* generated routes */
	'/home': { component: 'page-home' },
	'/about': { component: 'page-about' },
	/* end of generated routes */
}

// if route change, then
const pathChange = (value) => {

	// check if redirect
	if(routes[value.to]?.redirect){
		router.go(routes[value.to]?.redirect);
		return;
	}

	const selectedPageId = routes[value.to]?.component;

	if(selectedPageId){
		ui.registerElement({ type: 'pages', name: selectedPageId, id: selectedPageId });
	}
}

router.init(main, routes, pathChange);

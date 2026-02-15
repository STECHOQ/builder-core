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
	/* end of generated routes */
}

// if route change, then
const pathChange = (value) => {

	// check if redirect
	if(routes[value.to]?.redirect){
		router.go(routes[value.to]?.redirect);
		return;
	}
}

ui.registerElement({ type: 'pages', name: 'PageHome', id: 'page-home' });

router.init(main, routes, pathChange);

// PLEASE DON'T CHANGE EVERYTHING BETWEEN '/* ... */' blabla '/* end of ... */'

/* js components */
/* end of js components */

/* js components plugin */
/* end of js components plugin */

import router from './models/router.js';

const rawMainEl = document.getElementsByTagName('main-element');
const main = rawMainEl[0];

const routes = {
	'/': {
		redirect: DEFAULT_PAGE
	},

	/* generated routes */
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

router.init(main, routes, pathChange);

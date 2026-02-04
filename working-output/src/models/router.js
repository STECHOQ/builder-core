// ignore code below
// it just contains router main login
// just fill variables above!
class router extends EventTarget {

	_currentPath = null;
	_rootComponent = null;
	_currentQuery = null;

	constructor() {
		super();
	}

	emit(title, content = {}){
		const self = this;

		if(title){
			self.dispatchEvent(new CustomEvent(title, { detail: content }))
		}
	}

	init(rootComponent, routes, pathChange){
		const self = this;

		self._rootComponent = rootComponent;
		self._routes = routes;
		self._pathChange = pathChange;

		const listeners = {
			'path-change': ({ detail }) => {
				self._pathChange({
					...detail,
					router: self
				});
			}
		}

		for(let key in listeners){
			self.addEventListener(key, listeners[key]);
		}

		// get url path
		const currentPath = window.location.pathname;

		// get appropiate component based on path
		self.go(currentPath)
	}

	getCurrentPath(){
		const self = this;

		const currentPath = window.location.pathname;
		return self._currentPath || currentPath;
	}

	getQuery(){
		const self = this;

		// https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
		return Object.fromEntries(new URLSearchParams(location.search));

	}

	go(path){

		const self = this;

		// ignore path query
		let pathQuery;
		if(path.includes('?')){
			const pathParse = path.split('?');			
			pathQuery = pathParse[1]
			path = pathParse[0]
		}

		try{
			if(!self._routes[path]){
				console.error(`${path} not registered at models/router.js`)

				self.go('/404');

				return {
					status: false,
					error: `${path} not registered at models/router.js`,
				}
			}

			if(self._currentPath == path){
				return;
			}

			// clear current component
			/*while (self._rootComponent.lastElementChild) {
				self._rootComponent.removeChild(self._rootComponent.lastElementChild);
  			}*/

			const currentPath = window.location.pathname;

			if(currentPath != path){
				if(pathQuery){
					window.location.assign(`${path}?${pathQuery}`);
				}else{
					window.location.assign(path);
				}
			}

			// add new component
			if(self._routes[path]?.component){
				const content = document.createElement(self._routes[path].component);
				self._rootComponent.append(content);
			}

			self._currentPath = path;

			self.emit('path-change', {
				from: localStorage.getItem('bPath'),
				to: path
			});

			localStorage.setItem('bPath', path);

		}
		catch(error){
			console.error(error);
		}
	}
}

export default new router();

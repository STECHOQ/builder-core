class router {
	constructor() {
		const self = this;
	}

	getCurrentPath(){
		const self = this;

		return window.parent.location.pathname;
	}

	getQuery(){
		const self = this;

		// https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
		return Object.fromEntries(new URLSearchParams(window.parent.location.search));

	}

	go(path){
		const self = this;

		window.parent.location.assign(path);
	}

}

export default new router()

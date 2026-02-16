class ui extends EventTarget {
	constructor() {
		super();

		const self = this;

		self._listenScreenSize();
	}

	emit(title, content = {}){
		const self = this;

		if(title){
			self.dispatchEvent(new CustomEvent(title, { detail: content }))
		}
	}

	// https://stackoverflow.com/questions/75988682/debounce-in-javascript
	// https://www.joshwcomeau.com/snippets/javascript/debounce/
	_debounce(callback, wait) {
  		let timeoutId = null;
  		return (...args) => {
    		window.clearTimeout(timeoutId);
    		timeoutId = window.setTimeout(() => {
      			callback(...args);
    		}, wait);
  		};
	}

	_listenScreenSize(){
		const self = this;

		const debounceEvent =  self._debounce((e) => {
			self.triggerUpdateScreen();
		}, 300);

		window.addEventListener('resize', debounceEvent)
	}

	triggerUpdateScreen(){
		const self = this;

		self.emit('screen-resize', {
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	isMobile(){
		const self = this;

		return ( window.innerWidth <= 800 );
	}

	// send message accross page
	// with session storage
	// on my case, i use it for notification
	setFlag(message){
		sessionStorage.setItem('flag', JSON.stringify(message));
	}

	getFlag(){
		let raw = sessionStorage.getItem('flag');
		let message = null;

		try{
			message = JSON.parse(raw);
		}catch(err){
			message = raw;
		}

		sessionStorage.removeItem('flag');

		return message;
	}

	async registerElement({
		type,
		name,
		id
	}){
		// handle duplicate customElements
		if(window.customElements.get(id)) return;

		// only support one-depth only
		const module = await import(`./../${type}/${name}/index.js`);

		window.customElements.define(id, module.default);
	}
}

export default new ui()

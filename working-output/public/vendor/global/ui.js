class ui {
	constructor() {
		const self = this;
	}

	// https://stackoverflow.com/questions/75988682/debounce-in-javascript
	// https://www.joshwcomeau.com/snippets/javascript/debounce/
	debounce(callback, wait) {
  		let timeoutId = null;
  		return (...args) => {
    		window.clearTimeout(timeoutId);
    		timeoutId = window.setTimeout(() => {
      			callback(...args);
    		}, wait);
  		};
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

	createIframeBridge(targetWindow, origin = '*') {
		const listeners = {};

		window.addEventListener('message', (event) => {
			if (origin !== '*' && event.origin !== origin) return;

			const { type, payload, _broadcasted } = event.data;

			// Prevent message echo
			if (_broadcasted && window._broadcastEchoGuard) return;

			// Mark this window so it doesn't echo it again
			window._broadcastEchoGuard = true;
			setTimeout(() => window._broadcastEchoGuard = false, 10); // short-lived guard

			if (listeners[type]) {
				listeners[type](payload);
			}
		});

		return {
			on(type, handler) {
				listeners[type] = handler;
			},
			send(type, payload, opts = {}) {
				targetWindow.postMessage({
					type,
					payload,
					_broadcasted: opts.broadcast || false
				}, origin);
			}
		};
	}

}

export default new ui()

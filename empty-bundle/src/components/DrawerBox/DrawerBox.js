import ui from '../../models/ui.js';

class ELEMENT extends HTMLElement {
    constructor(){
        super();
	}

	createWrapper(){
		const self = this;

		const wrapper = document.createElement('div');
		wrapper.classList.add('overflow-auto', 'drawer-wrapper');

		const component = document.createElement('div');
		component.classList.add('grid-stack');
		wrapper.append(component);

		return wrapper;
	}

	setData({ items, totalComponent }){
		const self = this;

		self._items = items;
		self._totalComponent = totalComponent;
	}

    connectedCallback(){
        const self = this;

        self._selectedItem;

		self.append(self.createWrapper());
		
		self._counterId = 0;
		window.onload = () => {
			GridStack.renderCB = async (el, w) => {

				const component = document.createElement(w.content);

				if(w.subGridOpts){
					component.classList.add('absolute-wrapper');
					el.classList.add('hide-scroll');
				}else{
					el.classList.add('to-the-front');
				}

				el.append(component);

				const response = await fetch(`/components/${w.content}/index.html`)
				if(response.ok){
					const html = await response.text();
					component.innerHTML = html

					// if all loaded, then execute js on the file
					if(self._counterId + 1 >= self._totalComponent){
						ui.emit('all-loaded')
					}
				}

				el.id = `widget-${self._counterId}`;
				w.id = self._counterId;
				self._counterId++;

    		};

			self._grid = GridStack.init({
				float: true,
				cellHeight: '2vh',
				//staticGrid: true
				//acceptWidgets: true,
    			//removable: true,
    			margin: 0,
    			column: 48,
    			cellHeightThrottle: 0,
			});
			
			self._grid.setStatic(true)
			self._grid.load(self._items);
		}


		self._listeners = {}

		for(let key in self._listeners){
			ui.addEventListener(key, self._listeners[key]);
		}
    }

    disconnectedCallback(){
        const self = this;

		for(let key in self._listeners){
			ui.removeeventlistener(key, self._listeners[key]);
		}
    }
}

export default window.customElements.define(
    'drawer-box', ELEMENT
)

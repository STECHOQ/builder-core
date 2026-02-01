class SomehowTable {
	_container = undefined;

	constructor(container) {
		const self = this;
		self._container = container;

		self._paging = {
			offset: 1,
			current: {
				page: 0,
				item: { from: 0, to: 0 },
			},
			perPage: 0,
			total: { item: 0, page: 0 },
		};

		self._search = document.createElement('div');

		self._thead = document.createElement('thead');
		self._thead.classList.add(
				'bg-info',
			);

		self._tbody = document.createElement('tbody');

		self._table = document.createElement('table');
		self._table.classList.add(
				'table',
				'table-stripped',
				'table-hover',
			);

		self._table.append(self._thead, self._tbody);

		self._navigation = document.createElement('ul');
		self._navigation.classList.add(
				'pagination',
			);

		self._navText = document.createElement('small');
		self._navText.classList.add(
				'nav-text',
				'font-weight-bold',
			);

		self._nav = document.createElement('nav');
		self._nav.classList.add(
				'd-flex',
				'justify-content-between',
				'w-100',
				'align-items-center',
			);
		self._nav.append(self._navText, self._navigation);

		self._container.append(self._search, self._table, self._nav);

		self._columns = undefined;
	}

	_flattenObj(obj) {
		const self = this;

		const result = {};

		for (const i in obj) {
			if ((typeof obj[i]) === 'object' && !Array.isArray(obj[i])) {
				const temp = self._flattenObj(obj[i]);
				for (const j in temp) {
					result[i + '.' + j] = temp[j];
				}
			} else {
				result[i] = obj[i];
			}
		}

		return result;
	}

	clearBody() {
		const self = this;
		while (self._tbody.lastElementChild) {
			self._tbody.removeChild(self._tbody.lastElementChild);
		}

		return self;
	}

	/**
	 * @params {Object[]} pair
	 * @params {string} pair.key - object key for target column
	 * @params {string} pair.column - target column
	 * @params {string} pair.alias - Column alias
	 * */
	setHeader(pair) {
		const self = this;

		self._columns = [];

		const tr = document.createElement('tr');
		tr.classList.add('shtb-thead-tr');
		self._thead.append(tr);

		for (const item of pair) {
			self._columns.push(item);

			const th = document.createElement('th');
			th.classList.add('shtb-thead-th');
			th.innerText = item.alias ?? item.column;

			tr.append(th);
		}

		return self;
	}

	setBody(rows) {
		const self = this;

		if (!Array.isArray(rows)) {
			throw Error('rows must be an array of objects');
		}

		for(const row of rows) {
			const tr = document.createElement('tr');
			tr.classList.add('shtb-tbody-tr');
			self._tbody.append(tr);

			const flattened = self._flattenObj(row);
			for (const col of self._columns) {
				const record = flattened[col.key];

				const isDefined = record != undefined;
				const isFunction = col.fn instanceof Function;
				const isValid = isDefined || isFunction;

				const td = document.createElement('td');
				td.classList.add('shtb-tbody-td');
				tr.append(td);

				if (!isValid) continue;

				const content = isFunction ? col.fn(row) : record;

				switch (col.as) {

				case 'HTML':
				case 'html': {
					td.innerHTML = content;
				} break;

				case 'dom':
				case 'DOM': {
					td.append(content);
				} break;

				case 'text':
				default: {
					td.innerText = content;
				} break;

				}
			}
		}

		return self;
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

	setSearch() {
		const self = this;

		/*while(self._search.lastElementChild) {
			self._search.removeChild(self._search.lastElementChild);
		}*/

		self._search.classList.add('d-flex', 'w-100', 'justify-content-end', 'mb-2');

		const content = document.createElement('div');
		content.classList.add('d-flex')

		const title = document.createElement('span');
		title.innerHTML = 'Pencarian&nbsp:&nbsp';

		const input = document.createElement('input');
		input.classList.add('form-control', 'form-control-sm');
		input.setAttribute('type', 'search');

		const debounceEvent = self._debounce((e) => {

			const custEv = new CustomEvent('word-search', {
				detail: { value: e.target.value },
			});	

			self._search.dispatchEvent(custEv);

		}, 300);

		input.addEventListener('input', debounceEvent);

		content.append(title, input)

		self._search.append(content)

		return self;
	}

	_createPageLinkPrev(state = {}) {
		const self = this;

		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.classList.add(
				'page-link',
			);
		link.innerText = 'Sebelumnya';

		const li = document.createElement('li');
		li.classList.add('page-item', 'previous');
		li.append(link);

		const num = self._paging.current.page - 1;

		const { active, disabled } = state;

		if (active) li.classList.add('active');
		if (disabled) li.classList.add('disabled');

		if (!active && !disabled) {
			link.addEventListener('click', function(e) {
				const navEv = new CustomEvent('navigate', {
						detail: { page: num },
					});

				self._navigation.dispatchEvent(navEv);
			});
		}

		return li;
	}

	_createPageLinkNext(state = {}) {
		const self = this;

		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.classList.add(
				'page-link',
			);
		link.innerText = 'Selanjutnya';

		const li = document.createElement('li');
		li.classList.add('page-item', 'next');
		li.append(link);

		const num = self._paging.current.page + 1;

		const { active, disabled } = state;

		if (active) li.classList.add('active');
		if (disabled) li.classList.add('disabled');

		if (!active && !disabled) {
			link.addEventListener('click', function(e) {
				const navEv = new CustomEvent('navigate', {
						detail: { page: num },
					});

				self._navigation.dispatchEvent(navEv);
			});
		}

		return li;
	}

	_createPageLink(num, offset, state = {}) {
		const self = this;

		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.classList.add(
				'page-link',
			);
		link.innerText = Number.isInteger(num) ? num + offset : num;

		const li = document.createElement('li');
		li.classList.add('page-item');
		li.append(link);

		const { active, disabled } = state;

		if (active) li.classList.add('active');
		if (disabled) li.classList.add('disabled');

		if (!active && !disabled) {
			link.addEventListener('click', function(e) {
				const navEv = new CustomEvent('navigate', {
						detail: { page: num, offset },
					});

				self._navigation.dispatchEvent(navEv);
			});
		}

		return li;
	}

	setPaginationToCenter(value){
		const self = this;

		if(value){
			self._nav.classList.add('flex-column', 'flex-wrap');
		}else{
			self._nav.classList.remove('flex-column', 'flex-wrap');
		}
	}

	setPagination(paging, options = {}) {
		const self = this;

		const { singleNumber } = options;

		while(self._navigation.lastElementChild) {
			self._navigation.removeChild(self._navigation.lastElementChild);
		}

		self._paging.perPage = paging.perPage;
		self._paging.total.page = paging.total.page;
		self._paging.total.item = paging.total.item;
		self._paging.current.page = paging.page;
		self._paging.current.item.from = (paging.page * paging.perPage)  + self._paging.offset;
		self._paging.current.item.to = Math.min((paging.page * paging.perPage) + paging.perPage, paging.total.item);

		const maxPage = 4;
		let num = 0;

		let prev = self._createPageLinkPrev();
		if (self._paging.current.page == 0){
			prev = self._createPageLinkPrev({ disabled: true });
		}
		self._navigation.append(prev);

		if (self._paging.current.page >= maxPage) {
			num = self._paging.current.page - 2;

			const item = self._createPageLink(0, self._paging.offset);

			if(!singleNumber)
			self._navigation.append(item);

			if(num > 1) {
				const pad = self._createPageLink('...', null, { disabled: true });

				if(!singleNumber)
				self._navigation.append(item, pad);
			}
		}

		const limit = Math.min(num + maxPage, self._paging.total.page);
		for (; num <= limit; num++) {
			const active = num === self._paging.current.page;

			if(singleNumber && !active) continue;

			const item = self._createPageLink(num, self._paging.offset, { active });
			self._navigation.append(item);
		}

		if (limit < self._paging.total.page) {
			if (self._paging.total.page - num > 1) {
				const pad = self._createPageLink('...', null, { disabled: true });

				if(!singleNumber)
				self._navigation.append(pad);
			}

			const active = self._paging.total.page === self._paging.current.page;
			const item = self._createPageLink(self._paging.total.page, self._paging.offset);

			if(!singleNumber)
			self._navigation.append(item);
		}

		let next = self._createPageLinkNext();
		if (self._paging.current.page == self._paging.total.page){
			next = self._createPageLinkNext({ disabled: true });
		}
		self._navigation.append(next);

		self._navText.innerText = 'Data '
			+ self._paging.current.item.from
			+ ' - '
			+ self._paging.current.item.to
			+ ' (Total: ' + self._paging.total.item + ')';

		return self;
	}

	removePagination() {
		const self = this;

		while (self._navigation.lastElementChild) {
			self._navigation.removeChild(self._navigation.lastElementChild);
		}

		self._navText.innerText = '';	
	}

	get navigation() {
		return this._navigation;
	}

	get search(){
		return this._search;
	}
}

export default SomehowTable;

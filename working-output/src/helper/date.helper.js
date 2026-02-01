import formatter from './dateformatter.module.js';

class hDate {
	isValid(_date){
		return _date
			&& Object.prototype.toString.call(_date) === '[object Date]'
			&& !isNaN(_date);
	}

	locale(lang) {
		formatter.locale(lang);
		return this;
	}

	format(_format = 'YYYY-MM-DD HH:mm:ss', _date){
		if(!this.isValid(_date)) _date = new Date();
		return formatter.compile(_format, _date);
	}
}

export default new hDate();

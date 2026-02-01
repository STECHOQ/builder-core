/**
 * Taken from: date-and-time (c) KNOWLEDGECODE
 * https://github.com/knowledgecode/date-and-time
 * */

let lang = 'en';

const _res = {
	en: {
		MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		MMM : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		ddd : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dd  : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		A   : ['AM', 'PM']
	},

	id: {
		MMMM: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
		MMM : ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
		dddd: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
		ddd : ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
		dd  : ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
	},
};

const formatter = {
	YYYY: d => ('000' + d.getFullYear()).slice(-4),
	YY  : d => ('0' + d.getFullYear()).slice(-2),
	Y   : d => '' + d.getFullYear(),
	MMMM: d => res().MMMM[d.getMonth()],
	MMM : d => res().MMM[d.getMonth()],
	MM  : d => ('0' + (d.getMonth() + 1)).slice(-2),
	M   : d => '' + (d.getMonth() + 1),
	DD  : d => ('0' + d.getDate()).slice(-2),
	D   : d => '' + d.getDate(),
	HH  : d => ('0' + d.getHours()).slice(-2),
	H   : d => '' + d.getHours(),
	A   : d => res().A[d.getHours() > 11 | 0],
	hh  : d => ('0' + (d.getHours() % 12 || 12)).slice(-2),
	h   : d => '' + (d.getHours() % 12 || 12),
	mm  : d => ('0' + d.getMinutes()).slice(-2),
	m   : d => '' + d.getMinutes(),
	ss  : d => ('0' + d.getSeconds()).slice(-2),
	s   : d => '' + d.getSeconds(),
	SSS : d => ('00' + d.getMilliseconds()).slice(-3),
	SS  : d => ('0' + (d.getMilliseconds() / 10 | 0)).slice(-2),
	S   : d => '' + (d.getMilliseconds() / 100 | 0),
	dddd: d => res().dddd[d.getDay()],
	ddd : d => res().ddd[d.getDay()],
	dd  : d => res().dd[d.getDay()],
	Z   : d => {
		const offset = d.getTimezoneOffset() / 0.6 | 0;
		return (offset > 0 ? '-' : '+')
			+ ('000' + Math.abs(offset - (offset % 100 * 0.4 | 0))).slice(-4);
	},
	ZZ  : d => {
		const offset = d.getTimezoneOffset();
		const mod = Math.abs(offset);
		return (offset > 0 ? '-' : '+')
			+ ('0' + (mod / 60 | 0)).slice(-2)
			+ ':'
			+ ('0' + mod % 60).slice(-2);
	},
};

const regex = {
	token: /\[(?:[^[\]]|\[[^[\]]*])*]|([A-Za-z])\1*|\.{3}|./g,
	comment: /^\[(.*)\]$/,
};

function res() {
	return _res[lang];
}

function locale(tar) {
	if (!_res[tar]) return false;
	lang = tar;
	return lang;
}

function compile(fmt, d) {
	let str = '';

	const match = fmt.match(regex.token) || [];

	for(const pattern of match) {
		str += formatter[pattern]
			? formatter[pattern](d)
			: pattern.replace(regex.comment, '$1');
	}

	return str;
}

export default { compile, locale };

class hUtils {

	set(key, val){
		this[`_${key}`] = val;
		return this;
	};

	// https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
	colorIsLight(color){
		const hex = color.replace('#', '');
		const c_r = parseInt(hex.substring(0, 0 + 2), 16);
		const c_g = parseInt(hex.substring(2, 2 + 2), 16);
		const c_b = parseInt(hex.substring(4, 4 + 2), 16);
		const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;

		return brightness > 155;
	};

	// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
	hexToRgb(hex) {
		const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
		const result = hex.match(regex);

		return !result
			? null
			: {
				r: parseInt(result[1], 16),
	   			g: parseInt(result[2], 16),
	   			b: parseInt(result[3], 16),
			};
	}

	rgbToHex({r, g, b}){
		return '#' + [r, g, b]
			.map(x => x.toString(16).padStart(2, '0'))
			.join('');
	}

	arrayFindByValue(arr, key, value){
		if(!Array.isArray(arr)){
			return false;
		}

		for(const item of arr){
			if(item[key] === value){
				return item;
			}
		}

		return null;
	};

	sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	round(n, dec = 2){
		const power = 10 ** dec;
		n *= power;
		const as_int = parseInt(n);
		const min = 0.5 - 1e-9;
		const plus = (n - as_int) > min ? 1 : 0;

		return (as_int + plus) / power;
	};


	floor(n, dec = 2){
		const power = 10 ** dec;
		const min = 1e-9;

		// floor is just integer in disguise
		return parseInt((n + min) * power) / power;
	};

	ceil(n, dec = 2){
		const power = 10 ** dec;
		n *= power;
		const as_int = parseInt(n);
		const min = 1e-9;
		const plus = (n - as_int) > min ? 1 : 0;

		return (as_int + plus) / power;
	};

	toFraction(x, tolerance = 0.0001, debug = false) {
		if (x < 0) x = -x;
		let num = 1, den = 1;

		try{
			function iterate() {
				let R = num / den;
				if (Math.abs((R-x) / x) < tolerance) return;

				if (R < x) {
					num++;
				} else {
					den++;
				}

				iterate();
			}

			iterate();

			return [num, den];
		} catch(error) {
			if(debug) console.error("num Error:", x);

			return [1,1];
		}
	};

	deepClone(obj) {
		return Object.keys(obj).reduce((v, d) => Object.assign(v, {
				[d]: (obj[d]?.constructor === Object)
					? this.deepClone(obj[d])
					: obj[d]
			}), {});
	}

	async download(response) {
		const isJSON = (response.headers.get('Content-Type')).includes('application/json')

		if(isJSON) return response.json();

		let filename = 'report.xlsx'; // default fallback
  		const disposition = response.headers.get('Content-Disposition');
  		if (disposition && disposition.includes('filename=')) {
    		const match = disposition.match(/filename="?([^"]+)"?/);
    		if (match && match[1]) filename = match[1];
  		}

		const blob = await response.blob();

  		const url = window.URL.createObjectURL(blob);
  		const a = document.createElement('a');
  		a.href = url;
  		a.download = filename; // fallback filename
  		document.body.appendChild(a);
  		a.click();
  		a.remove();
  		window.URL.revokeObjectURL(url);

  		return filename;
	}

	toKebabCase(str) {
  		return str
  			.trim()
			.replace(/\s/g, '-')
    		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')     // aaaB => aaa-B
    		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')   // JSONData => JSON-Data
    		.replace(/([a-zA-Z])([0-9])/g, '$1-$2')      // Page404 => Page-404
    		.replace(/([0-9])([a-zA-Z])/g, '$1-$2')      // 404Page => 404-Page (rare case)
    		.toLowerCase();
	}
}

export default new hUtils();

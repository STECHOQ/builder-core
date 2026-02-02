class stringFormatter {
	toKebabCase(str) {
		return str 
			.replace(/([a-z0-9])([A-Z])/g, '$1-$2')     // aaaB => aaa-B 
			.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')   // JSONData => JSON-Data 
			.replace(/([a-zA-Z])([0-9])/g, '$1-$2')      // Page404 => Page-404 
			.replace(/([0-9])([a-zA-Z])/g, '$1-$2')      // 404Page => 404-Page (rare case) 
			.toLowerCase();
	}

	capitalizeFirstLetter(string) {
  		if (string.length === 0) {
    		return ""; // Handle empty strings
  		}

  		const splitter = string.split(/\s|-/);
  		let result = "";
  		for(const word of splitter){
  			result += word.charAt(0).toUpperCase() + word.slice(1);
  		}
  		return result;
	}
}

export default new stringFormatter();

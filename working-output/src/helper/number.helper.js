class hNumber {

	putThousandsSeparators(number, region='id-ID'){
		const formatted = Number(number).toLocaleString(region);
		
		if(formatted == 'NaN') return number;

		return formatted;
	}

}

export default new hNumber();

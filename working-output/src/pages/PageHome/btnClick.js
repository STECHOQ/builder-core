function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

export default async function btnClick(self){
	self.querySelector('#btn-ok').addEventListener('click', () => {

    	const el = self.querySelector('simple-card').parentNode.parentNode;

		const randomX = getRandomIntInclusive(0, 48);
		const randomY = getRandomIntInclusive(0, 20);

    	self.grid.update(el, {x:randomX, y:randomY});
	})
}

export default async function btnClick(self){

	const btn = self.querySelector('#btn-ok');

	btn.addEventListener('click', () => {

		const input = self.querySelector('#input-random');

		const text = `Text: ${input.value}`;

		new Notify ({
    		status: 'success',
    		title: 'Berhasil',
    		text: text
    	})
	})

}

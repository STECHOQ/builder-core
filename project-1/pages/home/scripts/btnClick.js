export default async function btnClick(self){

	const btn = document.querySelector('#btn-ok');

	btn.addEventListener('click', () => {

		const input = document.querySelector('#input-random');

		const text = `Text: ${input.value}`;

		new Notify ({
    		status: 'success',
    		title: 'Berhasil',
    		text: text
    	})
	})

}

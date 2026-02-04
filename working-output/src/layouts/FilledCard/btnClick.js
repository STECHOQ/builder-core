export default async function btnClick(self){
	self.querySelector('#btn-ok-a').addEventListener('click', () => {
		new Notify ({
    		status: 'error',
    		title: 'GAGAL',
    		text: 'OK ?'
    	})
	})
}

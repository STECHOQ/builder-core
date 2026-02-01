const text = document.querySelector('#label-title');

let counter = 0;

setInterval(() => {
	text.innerText = `COUNTER ${counter++}`
}, 3000);

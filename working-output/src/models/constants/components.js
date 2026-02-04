export default [
	{
		name: 'Accordion',
		component: {w: 20, h: 15, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="collapse collapse-arrow bg-base-100 border border-base-300">
			<input type="radio" name="my-accordion-2" checked="checked" />
			<div class="collapse-title font-semibold">How do I create an account?</div>
			<div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
		</div>
		<div class="collapse collapse-arrow bg-base-100 border border-base-300">
			<input type="radio" name="my-accordion-2" />
			<div class="collapse-title font-semibold">I forgot my password. What should I do?</div>
			<div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
		</div>
		<div class="collapse collapse-arrow bg-base-100 border border-base-300">
			<input type="radio" name="my-accordion-2" />
			<div class="collapse-title font-semibold">How do I update my profile information?</div>
			<div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
		</div>

		<script type="module">
			const active = document.querySelector('input[name="my-accordion-2"]:checked');
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Avatar',
		component: {w: 2, h: 5, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="avatar avatar-placeholder">
			<div class="bg-neutral text-neutral-content w-12 rounded-full">
				<span class="text-3xl">D</span>
			</div>
		</div>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Alert',
		component: {w: 20, h: 5, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div role="alert" class="alert alert-info">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>
		<span>New software update available.</span>
		</div>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Badge',
		component: {w: 3, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="badge badge-soft badge-primary">Primary</div>
		

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Breadcrumbs',
		component: {w: 15, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="breadcrumbs text-sm">
			<ul>
				<li><a>Home</a></li>
				<li><a>Documents</a></li>
				<li>Add Document</li>
			</ul>
		</div>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Button',
		component: {w: 3, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<button class="btn">Default</button>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Card',
		component: {"subGridOpts":{"children":[{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<h2 class="card-title">Card Title</h2>

		<script type="module">
		</script>
	</body>
</html>`,"w":4,"h":2,"locked":"yes","x":1,"y":3},{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<p class="text-sm">A card component has a figure, a body part, and inside body there are title and actions parts!!!</p>

		<script type="module">
		</script>
	</body>
</html>`,"w":8,"h":4,"locked":"yes","x":1,"y":8},{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<button class="btn btn-primary">Buy Now</button>

		<script type="module">
		</script>
	</body>
</html>`,"w":3,"h":2,"locked":"yes","x":14,"y":16}]},"w":10,"h":23,"locked":"yes","content":`
<html>
	<head>
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
            }
		</style>
	</head>
	<body class="flex items-center justify-center h-screen w-screen">
		<div class="card bg-base-100 w-[98vw] h-[98vh] shadow-sm"></div>
	</body>
</html>`}
    },
	{
		name: 'Carousel',
		component: {w: 30, h: 22, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="carousel rounded-box">
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
				alt="Burger" />
			</div>
			<div class="carousel-item">
			<img 
				src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
				alt="Burger" />
			</div>
		</div>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
    {
		name: 'Checkbox',
		component: {w: 3, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<input type="checkbox" checked="checked" class="checkbox" />

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
    {
		name: 'Collapse',
		component: {w: 15, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="collapse bg-base-100 border-base-300 border">
		<input type="checkbox" />
		<div class="collapse-title font-semibold">How do I create an account?</div>
		<div class="collapse-content text-sm">
			Click the "Sign Up" button in the top right corner and follow the registration process.
		</div>
		</div>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
    {
		name: 'Countdown',
		component: {w: 3, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<span class="countdown">
			<span style="--value:59;" aria-live="polite" aria-label="59">59</span>
		</span>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Diff',
		component: {w: 20, h: 22, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<figure class="diff aspect-16/9" tabindex="0">
			<div class="diff-item-1" role="img" tabindex="0">
				<img alt="daisy" src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" />
			</div>
			<div class="diff-item-2" role="img">
				<img alt="daisy" 
				src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" />
			</div>
			<div class="diff-resizer"></div>
		</figure>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Divider',
		component: {"subGridOpts":{"children":[{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="card bg-white rounded-box grid h-20 place-items-center">content</div>

		<script type="module">
		</script>
	</body>
</html>`,"w":14,"h":4,"locked":"yes","x":0,"y":3},{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="divider m-0">OR</div>

		<script type="module">
		</script>
	</body>
</html>`,"w":14,"h":2,"locked":"yes","x":0,"y":12},{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="card bg-white rounded-box grid h-20 place-items-center">content</div>

		<script type="module">
		</script>
	</body>
</html>`,"w":14,"h":5,"locked":"yes","x":0,"y":16}]},"w":14,"h":30,"locked":"yes","content":`
<html>
	<head>
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
            }
		</style>
	</head>
	<body>
	</body>
</html>`}
    },
	{
		name: 'Fieldset',
		component: {w: 10, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<fieldset class="fieldset bg-base-100 border-base-200 rounded-box w-xs border p-4">
			<legend class="fieldset-legend">Page title</legend>
			<input type="text" class="input" placeholder="My awesome page" />
			<p class="label">You can edit page title later on from settings</p>
		</fieldset>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Filter',
		component: {w: 10, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
	<form>
		<input class="btn btn-square" type="reset" value="×"/>
		<input class="btn" type="checkbox" name="frameworks" aria-label="Svelte"/>
		<input class="btn" type="checkbox" name="frameworks" aria-label="Vue"/>
		<input class="btn" type="checkbox" name="frameworks" aria-label="React"/>
	</form>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Footer',
		component: {"subGridOpts":{"children":[{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<p class="text-sm">Copyright © ${new Date().getFullYear()} - All right reserved by PT Stechoq Robotika Indonesia</p>

		<script type="module">
		</script>
	</body>
</html>`,"w":15,"h":1,"locked":"yes","x":17,"y":1}]},"w":48,"h":6,"locked":"yes","content":`
<html>
	<head>
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
                height: 100%;
            }
		</style>
	</head>
	<body>
        <footer class="footer sm:footer-horizontal footer-center bg-white h-full"></footer>
    </body>
</html>`,"x":0,"y":94}
    },
	{
		name: 'Indicator',
		component: {w: 7, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 10px;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="indicator">
			<span class="indicator-item badge badge-primary">New</span>
			<div class="bg-white grid h-32 w-32 place-items-center">content</div>
		</div>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Text Input',
		component: {w: 10, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<input type="text" placeholder="Type here" class="input" />
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
    {
		name: 'Kbd',
		component: {w: 10, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		Press <kbd class="kbd kbd-sm">F</kbd>to pay respects.
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
    {
		name: 'Label',
		component: {w: 10, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<label class="input">
			<span class="label">https://</span>
			<input type="text" placeholder="URL" />
		</label>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Link',
		component: {w: 5, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<a class="link">Click me</a>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'List',
		component: {w: 15, h: 15, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<ul class="list bg-base-100 rounded-box shadow-md">
			<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
			<li class="list-row">
				<div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
				<div><div>Dio Lupa</div><div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div></div>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
				</button>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
				</button>
			</li>
			<li class="list-row">
				<div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
				<div><div>Ellie Beilish</div><div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div></div>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
				</button>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
				</button>
			</li>
			<li class="list-row">
				<div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
				<div><div>Sabrino Gardener</div><div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div></div>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
				</button>
				<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
				</button>
			</li>
		</ul>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Loading',
		component: {w: 5, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<span class="loading loading-spinner loading-xs"></span>
		<span class="loading loading-spinner loading-sm"></span>
		<span class="loading loading-spinner loading-md"></span>
		<span class="loading loading-spinner loading-lg"></span>
		<span class="loading loading-spinner loading-xl"></span>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Masked Image',
		component: {w: 5, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<img class="mask mask-squircle" src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Menu',
		component: {w: 10, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<ul class="menu bg-white rounded-box w-full">
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
			<li><a>Item 3</a></li>
		</ul>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Navbar',
		component: {"subGridOpts":{"children":[{"content":`
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<a class="btn btn-ghost text-xl">daisyUI</a>

		<script type="module">
		</script>
	</body>
</html>`,"w":4,"h":2,"locked":"yes","x":0,"y":1}]},"w":48,"h":7,"locked":"yes","content":`
<html>
	<head>
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
                height: 100%;
            }
		</style>
	</head>
	<body>
        <div class="navbar bg-base-100 shadow-sm"></div>
    </body>
</html>`,"x":0,"y":0}
    },
	{
		name: 'Pagination',
		component: {w: 8, h: 5, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="join">
			<button class="join-item btn">1</button>
			<button class="join-item btn btn-active">2</button>
			<button class="join-item btn">3</button>
			<button class="join-item btn">4</button>
		</div>
		
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Progress',
		component: {w: 10, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<progress class="progress w-56" value="0" max="100"></progress>
		<progress class="progress w-56" value="10" max="100"></progress>
		<progress class="progress w-56" value="40" max="100"></progress>
		<progress class="progress w-56" value="70" max="100"></progress>
		<progress class="progress w-56" value="100" max="100"></progress>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Radial Progress',
		component: {w: 15, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="radial-progress" style="--value:0;" aria-valuenow="0" role="progressbar">0%</div>
		<div class="radial-progress" style="--value:20;" aria-valuenow="20" role="progressbar">20%</div>
		<div class="radial-progress" style="--value:60;" aria-valuenow="60" role="progressbar">60%</div>
		<div class="radial-progress" style="--value:80;" aria-valuenow="80" role="progressbar">80%</div>
		<div class="radial-progress" style="--value:100;" aria-valuenow="100" role="progressbar">100%</div>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Radio',
		component: {w: 5, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<input type="radio" name="radio-1" class="radio" checked="checked" />
		<input type="radio" name="radio-1" class="radio" />
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Range Slider',
		component: {w: 10, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="w-full max-w-xs">
			<input type="range" min="0" max="100" value="25" class="range" step="25" />
			<div class="flex justify-between px-2.5 mt-2 text-xs">
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
			</div>
			<div class="flex justify-between px-2.5 mt-2 text-xs">
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
				<span>5</span>
			</div>
		</div>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Rating',
		component: {w: 10, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="rating rating-lg rating-half">
			<input type="radio" name="rating-11" class="rating-hidden" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-green-500" aria-label="0.5 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-green-500" aria-label="1 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-green-500" aria-label="1.5 star" checked="checked" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-green-500" aria-label="2 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-green-500" aria-label="2.5 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-green-500" aria-label="3 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-green-500" aria-label="3.5 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-green-500" aria-label="4 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-green-500" aria-label="4.5 star" />
			<input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-green-500" aria-label="5 star" />
		</div>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Select',
		component: {w: 10, h: 5, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<select class="select">
			<option disabled selected>Pick a color</option>
			<option>Crimson</option>
			<option>Amber</option>
			<option>Velvet</option>
		</select>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Stat',
		component: {w: 7, h: 7, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="stats bg-white shadow">
			<div class="stat">
				<div class="stat-title">Total Page Views</div>
				<div class="stat-value">89,400</div>
				<div class="stat-desc">21% more than last month</div>
			</div>
		</div>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Status',
		component: {w: 7, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="inline-grid *:[grid-area:1/1]">
			<div class="status status-error animate-ping"></div>
			<div class="status status-error"></div>
		</div> Server is down

				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Steps',
		component: {w: 15, h: 5, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
            }
            .step {
            	--step-bg: white;
            }
		</style>
	</head>
	<body>
		<ul class="steps">
			<li class="step step-primary">Register</li>
			<li class="step step-primary">Choose plan</li>
			<li class="step">Purchase</li>
			<li class="step">Receive Product</li>
		</ul>

				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Swap',
		component: {w: 5, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<label class="swap">
			<input type="checkbox" />
			<div class="swap-on">ON</div>
			<div class="swap-off">OFF</div>
		</label>

				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Tabs',
		component: {w: 15, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<!-- name of each tab group should be unique -->
		<div class="tabs tabs-lift">
			<input type="radio" name="my_tabs_3" class="tab" aria-label="Tab 1" />
			<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

			<input type="radio" name="my_tabs_3" class="tab" aria-label="Tab 2" checked="checked" />
			<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

			<input type="radio" name="my_tabs_3" class="tab" aria-label="Tab 3" />
			<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
		</div>

				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Table',
		component: {w: 20, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<div class="overflow-x-auto">
			<table class="table table-zebra">
				<!-- head -->
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
					</tr>
				</thead>
				<tbody>
					<!-- row 1 -->
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
					</tr>
					<!-- row 2 -->
					<tr>
						<th>2</th>
						<td>Hart Hagerty</td>
						<td>Desktop Support Technician</td>
						<td>Purple</td>
					</tr>
				</tbody>
			</table>
		</div>

				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Text Area',
		component: {w: 10, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<textarea class="textarea" placeholder="Bio"></textarea>
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Timeline',
		component: {w: 10, h: 10, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<ul class="timeline">
			<li>
				<div class="timeline-start">1984</div>
				<div class="timeline-middle">
					<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
					>
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
					</svg>
				</div>
				<div class="timeline-end timeline-box">First Macintosh computer</div>
				<hr class="bg-white" />
			</li>
			<li>
				<hr class="bg-white"  />
				<div class="timeline-start">1998</div>
				<div class="timeline-middle">
				<svg 
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-5 w-5"
				>
				<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
				</svg>
				</div>
				<div class="timeline-end timeline-box">iMac</div>
			</li>
		</ul>

		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
	{
		name: 'Toggle',
		component: {w: 5, h: 2, content: `
<html>
	<head>
		<link rel="stylesheet" href="/vendor/DaisyUI/daisyui-5.css">
		<script src="/vendor/DaisyUI/tailwind-4.js"></script>
		<style>
			html, body {
            	margin: 0;
            	padding: 0;
            	background: transparent !important;
          	}
		</style>
	</head>
	<body>
		<input type="checkbox" checked="checked" class="toggle" />
				
		<script type="module">
		</script>
	</body>
</html>`
    	}
    },
]

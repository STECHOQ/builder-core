#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;
const __basedir = path.join(__dirname, '..');

class listingPluginHeaders {
	constructor(){
		this.main();
	}

	async main(){
		const self = this;

		const dirSouces = [
			'vendor',
			'components'
		]

		const jsFileses = []
		const cssFileses = []

		for(let source of dirSouces){
			// get list of components
			const componentPath = path.join(__basedir, `public/${source}`);

			// get all css inside components
			const componentsCSS = await self.getRoutersSync(componentPath, ['.css']);

			// get all js inside components
			const componentsJS = await self.getRoutersSync(componentPath, ['.js']);

			// generate import for main.js
			const jsFiles = (Object.keys(componentsJS)).map(file => '/' + path.join(source, file));
			jsFileses.push(...jsFiles);
			
			// generate import for main.css
			const cssFiles = (Object.keys(componentsCSS)).map(file => '/' + path.join(source, file));
			cssFileses.push(...cssFiles);
		}

		const generateImportJS = await self.generateImportJS(jsFileses);
		const generateImportCSS = await self.generateImportCSS(cssFileses);

		// replace current import to main.js
		const mainFileJS = path.join(__basedir, "/index.html");
		const replaceMainJS = await self.replaceMainJS(mainFileJS, generateImportJS);

		// replace current import to main.css
		const mainFileCSS = path.join(__basedir, "/index.html");
		const replaceMainCSS = await self.replaceMainCSS(mainFileCSS, generateImportCSS);
	}

	async replaceMainCSS(filepath, newTexts){
		const self = this;

		// delete current import text
		const deleteResult = await self.deleteLine(filepath, '<!-- CSS Files -->', '<!-- End of CSS Files -->');
		if(!deleteResult.status){
			console.log(deleteResult.error);
			return deleteResult;
		}
		
		// add new import text
		const wrappedText = await self.addIndent(newTexts, deleteResult.data.indent);
		const addResult = await self.addLine(filepath, wrappedText, deleteResult.data.firstLine);
		if(!addResult.status){
			console.log(addResult.error);
			return addResult;
		}

		return { status: true };
	}

	async generateImportCSS(files){
		// example :
		// <link rel="stylesheet" href="/vendor/themes/tinydash/raws/light/css/simplebar.css">
		
		let texts = '<!-- CSS Files -->\n';
		for(let file of files){
			texts += `<link rel="stylesheet" href="${file}">\n`
		}
		texts += '<!-- End of CSS Files -->\n';

		return texts;
	}

	async replaceMainJS(filepath, newTexts){
		const self = this;

		// delete current import text
		const deleteResult = await self.deleteLine(filepath, '<!-- JS Files -->', '<!-- End of JS Files -->');
		if(!deleteResult.status){
			console.log(deleteResult.error);
			return deleteResult;
		}
		
		// add new import text
		const wrappedText = await self.addIndent(newTexts, deleteResult.data.indent);
		const addResult = await self.addLine(filepath, wrappedText, deleteResult.data.firstLine);
		if(!addResult.status){
			console.log(addResult.error);
			return addResult;
		}

		return { status: true };
	}

	async generateImportJS(files){
		// example :
		// <script vite-ignore src="/vendor/themes/tinydash/raws/light/js/jquery.min.js"></script>
		
		let texts = '<!-- JS Files -->\n';
		for(let file of files){
			texts += `<script vite-ignore src="${file}"></script>\n`
		}
		texts += '<!-- End of JS Files -->\n';


		return texts;
	}

	async deleteLine(fileName, firstKeyword, lastKeyword){
		return new Promise((resolve) => {
			fs.readFile(fileName, 'utf8', (err, data) => {

				const lines = data.split('\n');
				let newTexts = data;
				let currentLine = 0;
				let firstFoundLine = 0;
				let indent = '';

				let step = 0; // 1 = firstKeyword found, 2 = lastKeyword found

				for(let line of lines){

					currentLine++;

					if(line.includes(firstKeyword)){
						const indentMatch = line.match(/^(.*?)\<\!\-\-/);
						if(indentMatch?.length > 1){
							indent = indentMatch[1];
						}

						firstFoundLine = currentLine - 1;
						step = 1;
					}

					if(step == 1){
						newTexts = newTexts.replace(`${line}\n`, '');
					}

					if(line.includes(lastKeyword)){
						step = 2;
						break;
					}
				}

				if(step != 2){
					return resolve({
						status: false,
						error: "please don't update css & js import comment at index.html"
					})
				}

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts, firstLine: firstFoundLine, indent }
					});
				})
			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}

	prependToEachLineExceptLast(input, prefix) {
  		const lines = input.split('\n');
  		return lines
    		.map((line, idx) => idx === lines.length - 1 ? line : prefix + line)
    		.join('\n');
	}

	async addIndent(collected, indent){
		const self = this;

		return self.prependToEachLineExceptLast(collected, indent);
	}

	async addLine(fileName, newText, insertedLine){
		const self = this;

		return new Promise((resolve) => {
			fs.readFile(fileName, 'utf8', (err, data) => {

				let __lines = data.split('\n');
				let lines = __lines.map((line, index) => index < __lines.length - 1 ? `${line}\n` : line);

				lines.splice(insertedLine, 0, newText);
				const newTexts = lines.join('');

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts }
					});
				})

			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}

	async getRoutersSync(__path, _extensions = ['.js']) {
		const self = this;

    	const files = {};

    	//using sync, because it's only run when server is starting up and I dont want to get unnecessary headache
    	fs.readdirSync(__path)
        	.forEach( async (file) => {
            	const stats = fs.statSync(path.join(__path, file));

            	if (stats.isFile() && _extensions.includes(path.extname(file))) {
                	files[file] = path.resolve(__path, file);
            	} else if (stats.isDirectory()) {
                	//if file is a directory, recursively get all files inside it and add them into object
                	const tmp = await self.getRoutersSync(path.resolve(__path, file), _extensions);
                	for (let key in tmp) {
                    	files[path.join(file, key)] = tmp[key];
                	}
            	}
        	});

    	return files;
	};

	
}

new listingPluginHeaders();
